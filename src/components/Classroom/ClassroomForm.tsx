import React from 'react';
import { Modal, Form, Input, Select, InputNumber } from 'antd';
const { Option } = Select;
import type { Classroom } from '../../models/classroomModel';
import { RESPONSIBLE_PERSONS } from '../../models/classroomModel';

interface ClassroomFormProps {
  visible: boolean;
  onCancel: () => void;
  onOk: (values: Classroom) => void;
  initialValues?: Partial<Classroom>;
  loading: boolean;
  editingId?: string | null;
  classrooms: Classroom[];
}

const ClassroomForm: React.FC<ClassroomFormProps> = ({
  visible,
  onCancel,
  onOk,
  initialValues,
  loading,
  editingId,
  classrooms,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title={
        <span style={{ color: editingId ? '#1890ff' : '#52c41a' }}>
          {editingId ? 'Chỉnh sửa phòng học' : 'Thêm phòng học mới'}
        </span>
      }
      visible={visible}
      onOk={() => form.submit()}
      onCancel={() => {
        onCancel();
        form.resetFields();
      }}
      width={600}
      destroyOnClose
      confirmLoading={loading}
      okText={editingId ? 'Cập nhật' : 'Thêm mới'}
      cancelText="Hủy bỏ"
      maskClosable={false}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ type: 'theory', capacity: 20, ...initialValues }}
        onFinish={onOk}
      >
        <Form.Item
          name="code"
          label="Mã phòng"
          rules={[
            { required: true, message: 'Vui lòng nhập mã phòng!' },
            { max: 10, message: 'Mã phòng tối đa 10 ký tự!' },
            {
              pattern: /^[A-Z0-9]+$/,
              message: 'Mã phòng chỉ được chứa chữ hoa và số!',
            },
          ]}
        >
          <Input 
            placeholder="VD: A101, B202..." 
            maxLength={10}
            allowClear
          />
        </Form.Item>
        
        <Form.Item
          name="name"
          label="Tên phòng"
          rules={[
            { required: true, message: 'Vui lòng nhập tên phòng!' },
            { max: 50, message: 'Tên phòng tối đa 50 ký tự!' },
            {
              validator: (_, value) => {
                if (value && classrooms.some(c => 
                  c.name === value && 
                  (!editingId || c.id !== editingId)
                )) {
                  return Promise.reject('Tên phòng đã tồn tại!');
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input 
            placeholder="Nhập tên phòng" 
            maxLength={50} 
            allowClear
          />
        </Form.Item>
        
        <Form.Item
          name="responsiblePerson"
          label="Người phụ trách"
          rules={[{ required: true, message: 'Vui lòng chọn người phụ trách!' }]}
        >
          <Select 
            placeholder="Chọn người phụ trách"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              typeof option?.children === 'string' && (option.children as string).toLowerCase().includes(input.toLowerCase())
            }
          >
            {RESPONSIBLE_PERSONS.map(person => (
              <Option key={person} value={person}>{person}</Option>
            ))}
          </Select>
        </Form.Item>
        
        <Form.Item
          name="capacity"
          label="Số chỗ ngồi"
          rules={[
            { required: true, message: 'Vui lòng nhập số chỗ ngồi!' },
            { type: 'number', min: 1, max: 500, message: 'Số chỗ ngồi phải từ 1 đến 500!' },
          ]}
        >
          <InputNumber 
            min={1} 
            max={500} 
            style={{ width: '100%' }} 
            placeholder="Nhập số chỗ ngồi"
          />
        </Form.Item>
        
        <Form.Item
          name="type"
          label="Loại phòng"
          rules={[{ required: true, message: 'Vui lòng chọn loại phòng!' }]}
        >
          <Select>
            <Option value="theory">Lý thuyết</Option>
            <Option value="practice">Thực hành</Option>
            <Option value="auditorium">Hội trường</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ClassroomForm;