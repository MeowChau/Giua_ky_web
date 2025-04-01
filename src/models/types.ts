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
  }
  
  export interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
  }
  
  export type OrderStatus = 'pending' | 'shipping' | 'completed' | 'cancelled';
  
  export interface Order {
    id: string;
    customerId: string;
    orderDate: string;
    items: {
      productId: string;
      quantity: number;
      price: number;
    }[];
    status: 'pending' | 'shipping' | 'completed' | 'cancelled';
    totalAmount: number;
  }
  
  export interface OrderFormProps {
    visible: boolean;
    onCancel: () => void;
    onSave: (order: Order) => void;
    initialValues?: Order | null; // Add initialValues prop
  }