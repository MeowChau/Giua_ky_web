import { Order, OrderStatus } from '../../models/Order/orderTypes';

export const validateOrder = (order: Order): boolean => {
	if (!order.customer || !order.products.length || !order.orderDate || !order.status) {
		return false;
	}
	return true;
};

export const filterOrdersByStatus = (orders: Order[], status: OrderStatus) => {
	return orders.filter((order) => order.status === status);
};

export const searchOrders = (orders: Order[], query: string) => {
	return orders.filter(
		(order) =>
			order.id.includes(query) || order.customer.name.toLowerCase().includes(query.toLowerCase())
	);
};
