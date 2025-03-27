import React from 'react';
import { Input, Select } from 'antd';

const { Search } = Input;
const { Option } = Select;

interface OrderFilterProps {
	onSearch: (query: string) => void;
	onFilterChange: (status: string) => void;
}

const OrderFilter: React.FC<OrderFilterProps> = ({ onSearch, onFilterChange }) => {
	return (
		<div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
			<Search
				placeholder="Search by Order ID or Customer"
				onSearch={onSearch}
				enterButton
				style={{ width: 300 }}
			/>
			<Select
				placeholder="Filter by Status"
				onChange={onFilterChange}
				allowClear
				style={{ width: 200 }}
			>
				<Option value="Pending">Pending</Option>
				<Option value="Shipping">Shipping</Option>
				<Option value="Completed">Completed</Option>
				<Option value="Cancelled">Cancelled</Option>
			</Select>
		</div>
	);
};

export default OrderFilter;
