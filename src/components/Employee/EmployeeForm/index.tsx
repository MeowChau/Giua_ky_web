import React from 'react';
import { Form, Input, Select, InputNumber } from 'antd';
import type { Employee } from '../../../models/Employee/employee'; 
import { POSITIONS, DEPARTMENTS, STATUS_OPTIONS } from '../../../models/Employee/employee'; 
interface EmployeeFormProps {
  form: any;
  initialValues?: Employee;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ form, initialValues }) => {
  React.useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label="Họ tên"
        name="name"
        rules={[
          { required: true, message: 'Vui lòng nhập họ tên' },
          { max: 50, message: 'Họ tên không quá 50 ký tự' },
          { 
            pattern: /^[a-zA-ZÀ-ỹ\s]+$/,
            message: 'Họ tên không chứa ký tự đặc biệt' 
          }
        ]}
      >
        <Input placeholder="Nhập họ tên nhân viên" maxLength={50} />
      </Form.Item>

      <Form.Item
        label="Chức vụ"
        name="position"
        rules={[{ required: true, message: 'Vui lòng chọn chức vụ' }]}
      >
        <Select placeholder="Chọn chức vụ">
          {POSITIONS.map(pos => (
            <Select.Option key={pos} value={pos}>
              {pos}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Phòng ban"
        name="department"
        rules={[{ required: true, message: 'Vui lòng chọn phòng ban' }]}
      >
        <Select placeholder="Chọn phòng ban">
          {DEPARTMENTS.map(dept => (
            <Select.Option key={dept} value={dept}>
              {dept}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Lương"
        name="salary"
        rules={[
          { required: true, message: 'Vui lòng nhập lương' },
          { type: 'number', min: 0, message: 'Lương phải là số dương' }
        ]}
      >
        <InputNumber 
          style={{ width: '100%' }}
          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value: string | undefined) => {
            const parsed = parseFloat((value || '').replace(/\$\s?|(,*)/g, ''));
            return isNaN(parsed) ? 0 : parsed;
          }}
          min={0}
          step={100000}
        />
      </Form.Item>

      <Form.Item
        label="Trạng thái"
        name="status"
        rules={[{ required: true, message: 'Vui lòng chọn trạng thái' }]}
      >
        <Select placeholder="Chọn trạng thái">
          {STATUS_OPTIONS.map((status: string) => (
            <Select.Option key={status} value={status}>
              {status}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};

export default EmployeeForm;