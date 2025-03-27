import React, { useState } from 'react';
import { Form, Input, Select, Button, notification } from 'antd';
import useOrderModel from '../../models/Order/orderModel';
import { Order, Customer, Product } from '../../models/Order/orderTypes';

const { Option } = Select;

const OrderEdit: React.FC = () => {
	const { addOrder, updateOrder, customers, products } = useOrderModel();
	const [form] = Form.useForm();
	const [totalAmount, setTotalAmount] = useState<number>(0);

	const calculateTotalAmount = (selectedProductIds: string[]) => {
		const total = selectedProductIds.reduce((sum, productId) => {
			const product = products.find((p) => p.id === productId);
			return sum + (product ? product.price : 0);
		}, 0);
		setTotalAmount(total);
	};

	const handleSubmit = (values: Partial<Order> & { isNew: boolean }) => {
		if (!values.id || !values.customer || !values.products || !values.status) {
			notification.error({
				message: 'Validation Error',
				description: 'Please fill in all required fields.',
			});
			return;
		}

		const selectedProducts = values.products.map((productId) =>
			products.find((p) => p.id.toString() === productId.toString())
		);

		if (values.isNew) {
			addOrder({
				...values,
				products: selectedProducts,
				totalAmount,
			} as Order);
			notification.success({
				message: 'Success',
				description: 'Order added successfully!',
			});
		} else {
			updateOrder({
				...values,
				products: selectedProducts,
				totalAmount,
			} as Order);
			notification.success({
				message: 'Success',
				description: 'Order updated successfully!',
			});
		}
		form.resetFields();
		setTotalAmount(0);
	};

	return (
		<Form
			form={form}
			layout="vertical"
			onFinish={(values) => handleSubmit({ ...values, isNew: !values.id })}
			initialValues={{ status: 'Pending' }}
		>
			<Form.Item name="id" label="Order ID" rules={[{ required: true }]}>
				<Input placeholder="Enter Order ID" />
			</Form.Item>
			<Form.Item name="customer" label="Customer" rules={[{ required: true }]}>
				<Select placeholder="Select a customer">
					{customers.map((customer: Customer) => (
						<Option key={customer.id} value={customer.id}>
							{customer.name}
						</Option>
					))}
				</Select>
			</Form.Item>
			<Form.Item
				name="products"
				label="Products"
				rules={[{ required: true, message: 'Please select at least one product.' }]}
			>
				<Select
					mode="multiple"
					placeholder="Select products"
					onChange={(value) => calculateTotalAmount(value as string[])}
				>
					{products.map((product: Product) => (
						<Option key={product.id} value={product.id}>
							{product.name} - ${product.price}
						</Option>
					))}
				</Select>
			</Form.Item>
			<Form.Item label="Total Amount">
				<Input value={`$${totalAmount.toFixed(2)}`} readOnly />
			</Form.Item>
			<Form.Item name="status" label="Status" rules={[{ required: true }]}>
				<Select>
					<Option value="Pending">Pending</Option>
					<Option value="Shipping">Shipping</Option>
					<Option value="Completed">Completed</Option>
					<Option value="Cancelled">Cancelled</Option>
				</Select>
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit">
					Save
				</Button>
			</Form.Item>
		</Form>
	);
};

export default OrderEdit;
