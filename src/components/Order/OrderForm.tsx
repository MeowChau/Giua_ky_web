import React from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import { Order, Customer, Product } from '../../models/Order/orderTypes';

const { Option } = Select;

interface OrderFormProps {
	initialValues?: Partial<Order>;
	customers: Customer[];
	products: Product[];
	onSubmit: (values: Order) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ initialValues, customers, products, onSubmit }) => {
	const [form] = Form.useForm();

	const handleFinish = (values: any) => {
		if (!values.customer || !values.products.length) {
			message.error('Please fill in all required fields.');
			return;
		}
		const totalAmount = values.products.reduce(
			(acc: number, productId: string) => {
				const product = products.find((p) => p.id === productId);
				return acc + (product ? product.price : 0);
			},
			0
		);
		onSubmit({ ...values, totalAmount });
		message.success('Order saved successfully!');
	};

	return (
		<Form
			form={form}
			layout="vertical"
			initialValues={initialValues}
			onFinish={handleFinish}
		>
			<Form.Item name="id" label="Order ID" rules={[{ required: true }]}>
				<Input placeholder="Enter Order ID" />
			</Form.Item>
			<Form.Item name="customer" label="Customer" rules={[{ required: true }]}>
				<Select placeholder="Select a customer">
					{customers.map((customer) => (
						<Option key={customer.id} value={customer.id}>
							{customer.name}
						</Option>
					))}
				</Select>
			</Form.Item>
			<Form.Item name="products" label="Products" rules={[{ required: true }]}>
				<Select mode="multiple" placeholder="Select products">
					{products.map((product) => (
						<Option key={product.id} value={product.id}>
							{product.name} - ${product.price}
						</Option>
					))}
				</Select>
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

export default OrderForm;
