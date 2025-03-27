import React from 'react';
import { Descriptions, Button, Modal, notification } from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import useOrderModel from '../../models/Order/orderModel';

const OrderDetails: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const history = useHistory();
	const { orders, deleteOrder } = useOrderModel();

	const order = orders.find((order) => order.id === id);

	if (!order) {
		notification.error({
			message: 'Error',
			description: 'Order not found!',
		});
		history.push('/orders/list');
		return null;
	}

	const handleCancelOrder = () => {
		if (order.status !== 'Pending') {
			notification.warning({
				message: 'Action Not Allowed',
				description: 'Only orders with "Pending" status can be cancelled.',
			});
			return;
		}

		Modal.confirm({
			title: 'Are you sure you want to cancel this order?',
			content: 'This action cannot be undone.',
			okText: 'Yes, Cancel',
			cancelText: 'No',
			onOk: () => {
				deleteOrder(order.id);
				notification.success({
					message: 'Success',
					description: 'Order cancelled successfully!',
				});
				history.push('/orders/list');
			},
		});
	};

	return (
		<div>
			<Descriptions title="Order Details" bordered>
				<Descriptions.Item label="Order ID">{order.id}</Descriptions.Item>
				<Descriptions.Item label="Customer">{order.customer.name}</Descriptions.Item>
				<Descriptions.Item label="Order Date">{order.orderDate}</Descriptions.Item>
				<Descriptions.Item label="Total Amount">${order.totalAmount.toFixed(2)}</Descriptions.Item>
				<Descriptions.Item label="Status">{order.status}</Descriptions.Item>
				<Descriptions.Item label="Products">
					<ul>
						{order.products.map((product) => (
							<li key={product.id}>
								{product.name} - ${product.price} x {product.quantity}
							</li>
						))}
					</ul>
				</Descriptions.Item>
			</Descriptions>
			<div style={{ marginTop: 16 }}>
				<Button danger onClick={handleCancelOrder}>
					Cancel Order
				</Button>
			</div>
		</div>
	);
};

export default OrderDetails;
