import React from 'react';
import { Form, Input, Select, Button, message, Modal } from 'antd';
import type { Employee } from '@/models/Employee/employeeTypes';

const { Option } = Select;

interface EmployeeFormProps {
  open: boolean; // Thêm prop open để điều khiển modal
  onClose: () => void; // Prop để đóng modal
  onSubmit: (employee: Employee) => void;
  initialValues?: Employee;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ open, onClose, onSubmit, initialValues }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: Employee) => {
    onSubmit({ ...values, id: initialValues?.id || `EMP${Date.now()}` });
    message.success('Nhân viên đã được lưu thành công!');
    form.resetFields();
    onClose(); // Đóng modal sau khi lưu
  };

  return (
    <Modal title='Thêm Nhân Viên' visible={open} onCancel={onClose} footer={null}>
      <Form form={form} onFinish={handleFinish} layout='vertical' initialValues={initialValues}>
        <Form.Item name='name' label='Họ Tên' rules={[{ required: true, message: 'Vui lòng nhập họ tên!' }]}>
          <Input maxLength={50} placeholder='Nhập họ tên' />
        </Form.Item>

        <Form.Item name='position' label='Chức vụ' rules={[{ required: true, message: 'Vui lòng chọn chức vụ!' }]}>
          <Select placeholder="Chọn chức vụ">
            <Option value="Nhân viên">Nhân viên</Option>
            <Option value="Quản lý">Quản lý</Option>
          </Select>
        </Form.Item>

        <Form.Item name='department' label='Phòng Ban' rules={[{ required: true, message: 'Vui lòng chọn phòng ban!' }]}>
          <Select placeholder="Chọn phòng ban">
            <Option value="IT">IT</Option>
            <Option value="HR">HR</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EmployeeForm;
