import React from 'react';
import { Button, Popconfirm, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { Order } from '../../models/types';

interface OrderActionsProps {
  record: Order;
  onEdit: (order: Order) => void;
  onCancel: (orderId: string) => void;
  cancelingId?: string;
}

const OrderActions: React.FC<OrderActionsProps> = ({
  record,
  onEdit,
  onCancel,
  cancelingId,
}) => {
  return (
    <Space size="middle">
      <Button
        type="link"
        icon={<EditOutlined />}
        onClick={() => onEdit(record)}
      />
      {record.status === 'pending' && (
        <Popconfirm
          title="Bạn có chắc muốn hủy đơn hàng này?"
          onConfirm={() => onCancel(record.id)}
          okText="Đồng ý"
          cancelText="Hủy"
        >
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            loading={cancelingId === record.id}
          />
        </Popconfirm>
      )}
    </Space>
  );
};

export default OrderActions;