import React, { useEffect } from 'react';
import { Form, Input, Select, Button, message } from 'antd';
import useModel from '../../models/Course/courseModel';

const { Option } = Select;

interface CourseFormProps {
  mode: 'add' | 'edit';
  courseId?: string;
}

const CourseForm: React.FC<CourseFormProps> = ({ mode, courseId }) => {
  const [form] = Form.useForm();
  const { addCourse, updateCourse, fetchCourseById, courses } = useModel();

  useEffect(() => {
    if (mode === 'edit' && courseId) {
      const course = fetchCourseById(courseId);
      if (course) {
        form.setFieldsValue(course);
      }
    }
  }, [courseId]);

  const handleSubmit = async (values: any) => {
    if (mode === 'add') {
      const isDuplicate = courses.some((course: { name: string }) => course.name === values.name);
      if (isDuplicate) {
        message.error('Tên khóa học đã tồn tại!');
        return;
      }
      const success = await addCourse(values);
      if (success) {
        message.success('Thêm khóa học thành công!');
      } else {
        message.error('Thêm khóa học thất bại!');
      }
    } else if (mode === 'edit') {
      const success = await updateCourse(courseId!, values);
      if (success) {
        message.success('Cập nhật khóa học thành công!');
      } else {
        message.error('Cập nhật khóa học thất bại!');
      }
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        name="name"
        label="Tên khóa học"
        rules={[{ required: true, message: 'Vui lòng nhập tên khóa học!' }]}
      >
        <Input maxLength={100} />
      </Form.Item>
      <Form.Item
        name="instructor"
        label="Giảng viên"
        rules={[{ required: true, message: 'Vui lòng chọn giảng viên!' }]}
      >
        <Select>
          <Option value="Giảng viên A">Giảng viên A</Option>
          <Option value="Giảng viên B">Giảng viên B</Option>
        </Select>
      </Form.Item>
      <Form.Item name="description" label="Mô tả">
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item
        name="status"
        label="Trạng thái"
        rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
      >
        <Select>
          <Option value="Đang mở">Đang mở</Option>
          <Option value="Đã kết thúc">Đã kết thúc</Option>
          <Option value="Tạm dừng">Tạm dừng</Option>
        </Select>
      </Form.Item>
      <Button type="primary" htmlType="submit">
        {mode === 'add' ? 'Thêm mới' : 'Cập nhật'}
      </Button>
    </Form>
  );
};

export default CourseForm;