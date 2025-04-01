import React from 'react';
import { Form, Select } from 'antd';
import type { Customer } from '../../../models/types';

const sampleCustomers: Customer[] = [
  { id: '1', name: 'Customer 1', email: 'customer1@example.com' },
  { id: '2', name: 'Customer 2', email: 'customer2@example.com' },
  { id: '3', name: 'Customer 3', email: 'customer3@example.com' },
];

const CustomerSelect: React.FC = () => {
  return (
    <Form.Item
      name="customerId"
      label="Khách hàng"
      rules={[{ required: true, message: 'Vui lòng chọn khách hàng' }]}
    >
      <Select placeholder="Chọn khách hàng">
        {sampleCustomers.map((customer) => (
          <Select.Option key={customer.id} value={customer.id}>
            {customer.name} ({customer.email})
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default CustomerSelect;