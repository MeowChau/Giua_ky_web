import React, { useState, useEffect, useCallback } from 'react';
import { 
  Button, 
  Modal, 
  message,
  Card,
  Row,
  Col,
  Input,
  Select,
  Form
} from 'antd';
import { useEmployeeService } from '../../services/Employee/employeeService';
import EmployeeTable from '../../components/Employee/EmployeeTable';
import EmployeeForm from '../../components/Employee/EmployeeForm';
import type { Employee } from '../../models/Employee/employee';
import { POSITIONS, DEPARTMENTS } from '../../models/Employee/employee';

const EmployeeManagementPage: React.FC = () => {
  const {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee
  } = useEmployeeService();

  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);
  const [searchText, setSearchText] = useState('');
  const [positionFilter, setPositionFilter] = useState<string | null>(null);
  const [departmentFilter, setDepartmentFilter] = useState<string | null>(null);
  const [form] = Form.useForm();

  const applyFilters = useCallback(() => {
    let result = [...employees];
    
    if (searchText) {
      const lowerSearch = searchText.toLowerCase();
      result = result.filter(emp => 
        emp.id.toLowerCase().includes(lowerSearch) || 
        emp.name.toLowerCase().includes(lowerSearch)
      );
    }
    
    if (positionFilter) {
      result = result.filter(emp => emp.position === positionFilter);
    }
    
    if (departmentFilter) {
      result = result.filter(emp => emp.department === departmentFilter);
    }
    
    return result.sort((a, b) => b.salary - a.salary);
  }, [employees, searchText, positionFilter, departmentFilter]);

  useEffect(() => {
    setFilteredEmployees(applyFilters());
  }, [applyFilters]);

  const handleSubmit = useCallback(async () => {
    try {
      const values = await form.validateFields();
      
      if (currentEmployee) {
        updateEmployee(currentEmployee.id, values);
        message.success('Cập nhật nhân viên thành công');
      } else {
        addEmployee(values);
        message.success('Thêm nhân viên mới thành công');
      }
      
      setIsModalVisible(false);
      form.resetFields();
      setCurrentEmployee(null);
    } catch (error) {
      console.error('Validation failed:', error);
    }
  }, [currentEmployee, form, addEmployee, updateEmployee]);

  const handleEdit = useCallback((employee: Employee) => {
    setCurrentEmployee(employee);
    form.setFieldsValue(employee);
    setIsModalVisible(true);
  }, [form]);

  const handleDelete = useCallback((id: string) => {
    const employee = employees.find(emp => emp.id === id);
    
    if (!employee) {
      message.error('Không tìm thấy nhân viên');
      return;
    }
    
    if (employee.status === 'Đã ký hợp đồng') {
      message.error('Không thể xóa nhân viên đã ký hợp đồng');
      return;
    }
    
    deleteEmployee(id);
    message.success('Xóa nhân viên thành công');
  }, [employees, deleteEmployee]);

  const handleCancel = useCallback(() => {
    setIsModalVisible(false);
    form.resetFields();
    setCurrentEmployee(null);
  }, [form]);

  return (
    <div style={{ padding: '20px' }}>
      <Card title="Quản lý nhân viên" bordered={false}>
        <Row gutter={16} style={{ marginBottom: '20px' }}>
          <Col span={8}>
            <Input.Search
              placeholder="Tìm kiếm theo mã hoặc tên"
              allowClear
              enterButton
              onSearch={setSearchText}
              onChange={e => setSearchText(e.target.value)}
            />
          </Col>
          <Col span={8}>
            <Select
              style={{ width: '100%' }}
              placeholder="Lọc theo chức vụ"
              allowClear
              onChange={setPositionFilter}
              options={POSITIONS.map(pos => ({ label: pos, value: pos }))}
            />
          </Col>
          <Col span={8}>
            <Select
              style={{ width: '100%' }}
              placeholder="Lọc theo phòng ban"
              allowClear
              onChange={setDepartmentFilter}
              options={DEPARTMENTS.map(dept => ({ label: dept, value: dept }))}
            />
          </Col>
        </Row>

        <Button 
          type="primary" 
          onClick={() => setIsModalVisible(true)}
          style={{ marginBottom: '16px' }}
        >
          Thêm nhân viên
        </Button>

        <EmployeeTable 
          data={filteredEmployees} 
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={!employees}
        />

        <Modal
          title={currentEmployee ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên mới'}
          visible={isModalVisible}
          onOk={handleSubmit}
          onCancel={handleCancel}
          destroyOnClose
          okText={currentEmployee ? 'Cập nhật' : 'Thêm mới'}
          cancelText="Hủy"
        >
          <EmployeeForm form={form} initialValues={currentEmployee || undefined} />
        </Modal>
      </Card>
    </div>
  );
};

export default EmployeeManagementPage;