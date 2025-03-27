export type OrderStatus = 'Pending' | 'Shipping' | 'Completed' | 'Cancelled';

export interface Product {
	id: string;
	name: string;
	price: number;
	quantity: number;
}

export interface Customer {
	id: string;
	name: string;
	email: string;
	phone: string;
}

export interface Order {
	id: string;
	customer: Customer;
	products: Product[];
	orderDate: string;
	totalAmount: number;
	status: OrderStatus;
}
