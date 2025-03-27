import React, { useState, useEffect } from 'react';
import { Table, Input, Select } from 'antd';
import useOrderModel from '../../models/Order/orderModel';
import { Order, OrderStatus } from '../../models/Order/orderTypes';
import { filterOrdersByStatus, searchOrders } from '../../services/Order/orderService';

const { Search } = Input;
const { Option } = Select;

const OrderList: React.FC = () => {
	const { orders } = useOrderModel();
	const [filteredOrders, setFilteredOrders] = useState<Order[]>(orders);
	const [statusFilter, setStatusFilter] = useState<OrderStatus | ''>('');
	const [searchQuery, setSearchQuery] = useState<string>('');

	useEffect(() => {
		let result = orders;
		if (statusFilter) {
			result = filterOrdersByStatus(result, statusFilter);
		}
		if (searchQuery) {
			result = searchOrders(result, searchQuery);
		}
		setFilteredOrders(result);
	}, [orders, statusFilter, searchQuery]);

	const handleSearch = (value: string) => {
		setSearchQuery(value);
	};

	const handleFilterChange = (value: OrderStatus | '') => {
		setStatusFilter(value);
	};

	const columns = [
		{
			title: 'Order ID',
			dataIndex: 'id',
			key: 'id',
		},
		{
			title: 'Customer',
			dataIndex: ['customer', 'name'],
			key: 'customer',
		},
		{
			title: 'Order Date',
			dataIndex: 'orderDate',
			key: 'orderDate',
			sorter: (a: Order, b: Order) => new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime(),
		},
		{
			title: 'Total Amount',
			dataIndex: 'totalAmount',
			key: 'totalAmount',
			render: (amount: number) => `$${amount.toFixed(2)}`,
			sorter: (a: Order, b: Order) => a.totalAmount - b.totalAmount,
		},
		{
			title: 'Status',
			dataIndex: 'status',
			key: 'status',
		},
	];

	return (
		<div>
			<div style={{ marginBottom: 16, display: 'flex', gap: 16 }}>
				<Search
					placeholder="Search by Order ID or Customer"
					onSearch={handleSearch}
					enterButton
					style={{ width: 300 }}
				/>
				<Select
					placeholder="Filter by Status"
					onChange={handleFilterChange}
					allowClear
					style={{ width: 200 }}
				>
					<Option value="Pending">Pending</Option>
					<Option value="Shipping">Shipping</Option>
					<Option value="Completed">Completed</Option>
					<Option value="Cancelled">Cancelled</Option>
				</Select>
			</div>
			<Table
				dataSource={filteredOrders}
				columns={columns}
				rowKey="id"
				pagination={{ pageSize: 10 }}
			/>
		</div>
	);
};

export default OrderList;
