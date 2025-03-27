import { useState } from 'react';
import { Order, Customer, Product } from './orderTypes';

const sampleCustomers: Customer[] = [
	{ id: '1', name: 'John Doe', email: 'john@example.com', phone: '123456789' },
	{ id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '987654321' },
];

const sampleProducts: Product[] = [
	{ id: '101', name: 'Laptop', price: 1200, quantity: 1 },
	{ id: '102', name: 'Smartphone', price: 800, quantity: 2 },
	{ id: '103', name: 'Headphones', price: 150, quantity: 3 },
];

const sampleOrders: Order[] = [
	{
		id: 'ORD001',
		customer: sampleCustomers[0],
		products: [sampleProducts[0], sampleProducts[2]],
		orderDate: '2023-10-01',
		totalAmount: 1500,
		status: 'Pending',
	},
	{
		id: 'ORD002',
		customer: sampleCustomers[1],
		products: [sampleProducts[1]],
		orderDate: '2023-10-02',
		totalAmount: 800,
		status: 'Shipping',
	},
];

export default function useOrderModel() {
	const [orders, setOrders] = useState<Order[]>(() => {
		const storedOrders = localStorage.getItem('orders');
		return storedOrders ? JSON.parse(storedOrders) : sampleOrders;
	});

	const saveOrdersToLocalStorage = (updatedOrders: Order[]) => {
		localStorage.setItem('orders', JSON.stringify(updatedOrders));
		setOrders(updatedOrders);
	};

	const addOrder = (order: Order) => {
		saveOrdersToLocalStorage([...orders, order]);
	};

	const updateOrder = (updatedOrder: Order) => {
		const updatedOrders = orders.map((order) =>
			order.id === updatedOrder.id ? updatedOrder : order
		);
		saveOrdersToLocalStorage(updatedOrders);
	};

	const deleteOrder = (orderId: string) => {
		const updatedOrders = orders.filter((order) => order.id !== orderId);
		saveOrdersToLocalStorage(updatedOrders);
	};

	return {
		orders,
		addOrder,
		updateOrder,
		deleteOrder,
		customers: sampleCustomers,
		products: sampleProducts,
	};
}
