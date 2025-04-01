import React, { useState } from 'react';
import { Modal, Form, DatePicker } from 'antd';
import ProductSelect from './ProductSelect';
import CustomerSelect from './CustomerSelect';

interface Product {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  items: { productId: string; quantity: number; price: number }[];
  totalAmount: number;
  [key: string]: any; // Add additional fields as needed
}

const OrderForm: React.FC<{
  visible: boolean;
  onCancel: () => void;
  onSave: (order: Order) => void;
}> = ({ visible, onCancel, onSave }) => {
  const [form] = Form.useForm();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const handleSubmit = () => {
    form.validateFields().then(values => {
      const order = {
        ...values,
        items: selectedProducts.map(p => ({
          productId: p.id,
          quantity: p.quantity,
          price: p.price
        })),
        totalAmount: selectedProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0)
      };
      onSave(order);
    });
  };

  return (
    <Modal
      title="Thêm đơn hàng mới"
      visible={visible}
      onOk={handleSubmit}
      onCancel={onCancel}
      width={800}
    >
      <Form form={form} layout="vertical">
        <CustomerSelect />
        <Form.Item
          name="orderDate"
          label="Ngày đặt hàng"
          rules={[{ required: true, message: 'Vui lòng chọn ngày đặt hàng!' }]}
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        <ProductSelect 
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
        />
      </Form>
    </Modal>
  );
};

export default OrderForm;