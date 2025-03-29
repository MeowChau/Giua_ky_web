import { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Select, Button } from 'antd';

const { Option } = Select;

interface FormPhongHocProps {
  visible: boolean;
  onClose: () => void;
  editingPhong?: Record<string, any>;
  onSubmit: (values: any) => void;
}

export default function FormPhongHoc({ visible, onClose, editingPhong, onSubmit }: FormPhongHocProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingPhong) {
      form.setFieldsValue(editingPhong);
    } else {
      form.resetFields();
    }
  }, [editingPhong, form]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onSubmit(values);
        form.resetFields();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      title={editingPhong ? 'Chỉnh sửa phòng học' : 'Thêm phòng học'}
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Lưu
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="maPhong"
          label="Mã phòng"
          rules={[{ required: true, message: 'Vui lòng nhập mã phòng' }]}
        >
          <Input maxLength={10} />
        </Form.Item>
        <Form.Item
          name="tenPhong"
          label="Tên phòng"
          rules={[{ required: true, message: 'Vui lòng nhập tên phòng' }]}
        >
          <Input maxLength={50} />
        </Form.Item>
        <Form.Item
          name="soChoNgoi"
          label="Số chỗ ngồi"
          rules={[{ required: true, message: 'Vui lòng nhập số chỗ ngồi' }]}
        >
          <InputNumber min={1} />
        </Form.Item>
        <Form.Item
          name="loaiPhong"
          label="Loại phòng"
          rules={[{ required: true, message: 'Vui lòng chọn loại phòng' }]}
        >
          <Select>
            <Option value="Lý thuyết">Lý thuyết</Option>
            <Option value="Thực hành">Thực hành</Option>
            <Option value="Hội trường">Hội trường</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="nguoiPhuTrach"
          label="Người phụ trách"
          rules={[{ required: true, message: 'Vui lòng chọn người phụ trách' }]}
        >
          <Select>
            <Option value="Nguyễn Văn A">Nguyễn Văn A</Option>
            <Option value="Trần Thị B">Trần Thị B</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}
