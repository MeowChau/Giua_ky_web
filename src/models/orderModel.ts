import { useState, useEffect } from 'react';
import type { Order } from '../models/types';

export default function useOrderModel() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      const initialOrders: Order[] = [
        {
          id: '1',
          customerId: '1',
          orderDate: '2023-05-01',
          items: [{ productId: '1', quantity: 2, price: 100 }],
          status: 'pending',
          totalAmount: 200,
        },
        {
          id: '2',
          customerId: '2',
          orderDate: '2023-05-02',
          items: [{ productId: '2', quantity: 1, price: 200 }],
          status: 'shipping',
          totalAmount: 200,
        },
      ];
      setOrders(initialOrders);
      localStorage.setItem('orders', JSON.stringify(initialOrders));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  return { orders, setOrders };
}