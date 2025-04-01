import React from 'react';
import OrderList from '../../components/Order/OrderList';
import useOrderModel from '../../models/orderModel';

const OrderPage: React.FC = () => {
  const { orders, setOrders } = useOrderModel();
  return <OrderList orders={orders} setOrders={setOrders} />;
};

export default OrderPage;