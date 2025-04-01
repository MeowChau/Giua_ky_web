import React, { useState, useMemo, useCallback } from 'react';
import { Card, Row, Col, Input, Select, Button, Table, Tag, message } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import OrderForm from './OrderForm';
import OrderActions from './OrderActions';
import type { Order, OrderStatus } from '@/models/types' // Shared Order type
// Removed duplicate import of Order

const STATUS_CONFIG: Record<OrderStatus, { color: string; text: string }> = {
  pending: { color: 'orange', text: 'Chờ xác nhận' },
  shipping: { color: 'blue', text: 'Đang giao' },
  completed: { color: 'green', text: 'Hoàn thành' },
  cancelled: { color: 'red', text: 'Đã hủy' },
};

const OrderList: React.FC<{ 
  orders: Order[]; 
  setOrders: (orders: Order[]) => void 
}> = ({ orders, setOrders }) => {
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [cancelingId, setCancelingId] = useState<string | null>(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = order.id.toLowerCase().includes(searchText.toLowerCase());
      const matchesStatus = statusFilter ? order.status === statusFilter : true;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchText, statusFilter]);

  const handleEdit = useCallback((order: Order) => {
    setEditingOrder(order);
    setIsModalVisible(true);
  }, []);

  const handleCancelOrder = useCallback(async (orderId: string) => {
    setCancelingId(orderId);
    try {
      const updatedOrders = orders.map((order) =>
        order.id === orderId 
          ? { ...order, status: 'cancelled' as OrderStatus } 
          : order
      );
      setOrders(updatedOrders);
      message.success('Hủy đơn hàng thành công');
    } finally {
      setCancelingId(null);
    }
  }, [orders, setOrders]);

  const handleSaveOrder = useCallback((order: Order) => {
    if (editingOrder) {
      setOrders(orders.map((o) => 
        o.id === order.id ? order : o
      ));
      message.success('Cập nhật đơn hàng thành công');
    } else {
      const newOrder = { 
        ...order, 
        id: `order-${Date.now()}`,
        orderDate: new Date().toISOString().split('T')[0]
      };
      setOrders([...orders, newOrder]);
      message.success('Thêm đơn hàng thành công');
    }
    setIsModalVisible(false);
    setEditingOrder(null);
  }, [editingOrder, orders, setOrders]);

  const columns = useMemo(() => [
    {
      title: 'Mã đơn hàng',
      dataIndex: 'id',
      key: 'id',
      sorter: (a: Order, b: Order) => a.id.localeCompare(b.id),
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'orderDate',
      key: 'orderDate',
      render: (date: string) => new Date(date).toLocaleDateString('vi-VN'),
      sorter: (a: Order, b: Order) => new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime(),
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      render: (amount: number) => (
        <span style={{ fontWeight: 500 }}>
          {amount.toLocaleString('vi-VN')} ₫
        </span>
      ),
      sorter: (a: Order, b: Order) => a.totalAmount - b.totalAmount,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: OrderStatus) => (
        <Tag color={STATUS_CONFIG[status].color}>
          {STATUS_CONFIG[status].text}
        </Tag>
      ),
      filters: Object.entries(STATUS_CONFIG).map(([value, { text }]) => ({
        text,
        value,
      })),
      onFilter: (value: string | number | boolean, record: Order) => record.status === value as string,
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: Order) => (
        <OrderActions
          record={record}
          onEdit={handleEdit}
          onCancel={handleCancelOrder}
          cancelingId={cancelingId ?? undefined}
        />
      ),
    },
  ], [handleEdit, handleCancelOrder, cancelingId]);

  const handleAddNew = useCallback(() => {
    setEditingOrder(null);
    setIsModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
    setEditingOrder(null);
  }, []);

  return (
    <Card 
      title="Quản lý đơn hàng"
      bordered={false}
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={handleAddNew}
        >
          Thêm đơn hàng
        </Button>
      }
    >
      <div style={{ marginBottom: 16 }}>
        <Row gutter={16} align="middle">
          <Col xs={24} md={12} lg={8}>
            <Input
              placeholder="Tìm kiếm theo mã đơn"
              prefix={<SearchOutlined />}
              allowClear
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Select
              style={{ width: '100%' }}
              placeholder="Lọc theo trạng thái"
              allowClear
              onChange={setStatusFilter}
              value={statusFilter}
            >
              {Object.entries(STATUS_CONFIG).map(([value, { text }]) => (
                <Select.Option key={value} value={value}>
                  {text}
                </Select.Option>
              ))}
            </Select>
          </Col>
        </Row>
      </div>

      <Table
        columns={columns}
        dataSource={filteredOrders}
        rowKey="id"
        pagination={{ 
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Tổng ${total} đơn hàng`,
          pageSizeOptions: ['10', '20', '50'],
        }}
        locale={{
          emptyText: 'Không tìm thấy đơn hàng nào',
        }}
        scroll={{ x: true }}
      />

      <OrderForm
        visible={isModalVisible}
        onCancel={handleCloseModal}
        onSave={handleSaveOrder} // Pass handleSaveOrder to OrderForm

        initialValues={editingOrder} // Ensure OrderForm supports this prop or remove it
      />
    </Card>
  );
};

export default React.memo(OrderList);