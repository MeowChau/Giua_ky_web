import { message } from 'antd';

// Define or import the Order type
interface Order {
  id?: string;
  // Add other properties of the Order type as needed
}

export const saveOrder = (order: Order) => {
  try {
    // In a real app, this would be an API call
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const updatedOrders = order.id 
      ? orders.map((o: Order) => o.id === order.id ? order : o)
      : [...orders, { ...order, id: `order-${Date.now()}` }];
    
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    message.success(order.id ? 'Cập nhật thành công' : 'Tạo đơn thành công');
    return updatedOrders;
  } catch (error) {
    message.error('Có lỗi xảy ra');
    throw error;
  }
};

export const cancelOrder = (orderId: string) => {
  // Similar implementation
};