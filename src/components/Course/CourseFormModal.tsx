// src/components/CourseFormModal/CourseFormModal.tsx
import React from 'react';
import { Modal, Form, Input, Select, InputNumber, Button } from 'antd';
import type { Course } from '../../models/Course/course';
import { instructors, statuses } from '../../services/Course/constants';

interface CourseFormModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: Omit<Course, 'id'>) => void;
  initialValues?: Course | null;
}

const CourseFormModal: React.FC<CourseFormModalProps> = ({
  visible,
  onCancel,
  onSubmit,
  initialValues,
}) => {
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  return (
    <Modal
      title={initialValues ? 'Chỉnh sửa khóa học' : 'Thêm khóa học'}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          OK
        </Button>,
      ]}
    >
      <Form form={form} onFinish={onSubmit} layout="vertical">
        <Form.Item
          name="name"
          label="Tên khóa học"
          rules={[
            { required: true, message: 'Vui lòng nhập tên khóa học!' },
            { max: 100, message: 'Tên khóa học không được vượt quá 100 ký tự!' },
            {
              validator: (_, value) => {
                if (value && value.trim().length === 0) {
                  return Promise.reject('Tên khóa học không được chỉ chứa khoảng trắng!');
                }
                return Promise.resolve();
              }
            }
          ]}
        >
          <Input placeholder="Nhập tên khóa học" maxLength={100} showCount />
        </Form.Item>

        <Form.Item
          name="instructor"
          label="Giảng viên"
          rules={[{ required: true, message: 'Vui lòng chọn giảng viên!' }]}
        >
          <Select placeholder="Chọn giảng viên">
            {instructors.map(instructor => (
              <Select.Option key={instructor} value={instructor}>
                {instructor}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="students"
          label="Số lượng học viên"
          rules={[
            { required: true, message: 'Vui lòng nhập số lượng học viên!' },
            { type: 'number', min: 0, message: 'Số lượng học viên không được âm!' }
          ]}
        >
          <InputNumber placeholder="Nhập số lượng học viên" style={{ width: '100%' }} min={0} />
        </Form.Item>

        <Form.Item
          name="description"
          label="Mô tả khóa học"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
        >
          <Input.TextArea placeholder="Nhập mô tả khóa học" rows={4} />
        </Form.Item>

        <Form.Item
          name="status"
          label="Trạng thái"
          rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
        >
          <Select placeholder="Chọn trạng thái">
            {statuses.map(status => (
              <Select.Option key={status} value={status}>
                {status}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CourseFormModal;