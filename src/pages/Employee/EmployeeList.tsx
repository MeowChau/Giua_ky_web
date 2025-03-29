// Adjusted the path to the correct module exporting useModel
import EmployeeTable from '../../components/Employee/EmployeeTable';
import FilterBar from '../../components/Employee/FilterBar';
import EmployeeForm from '../../components/Employee/EmployeeForm';
import { Button, Card, message, Space } from 'antd';
import { useState, useEffect } from 'react';
import { useEmployeeModel } from '../../models/Employee/employeeModel'; // Adjust the import path to the correct model
import { PlusOutlined } from '@ant-design/icons';

import type { EmployeeStatus } from '../../models/Employee/employeeTypes';

export function EmployeeList() {
  const { employees, saveEmployees } = useEmployeeModel() as {
    employees: { id: string; name: string; position: string; department: string; salary: number; status: EmployeeStatus }[];
    saveEmployees: (newEmployees: { id: string; name: string; position: string; department: string; salary: number; status: EmployeeStatus }[]) => void;
  };
  
  const addEmployee = (employeeData: { id: string; name: string; position: string; department: string; salary: number; status: EmployeeStatus }) => {
    saveEmployees([...employees, employeeData]);
  };

  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    setFilteredEmployees(employees);
  }, [employees]);

  const handleFilter = (filters: { search: string; position: string; department: string }) => {
    let filtered = employees;

    if (filters.search) {
      filtered = filtered.filter(
        (emp) =>
          emp.id.includes(filters.search) ||
          emp.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.position) {
      filtered = filtered.filter((emp) => emp.position === filters.position);
    }

    if (filters.department) {
      filtered = filtered.filter((emp) => emp.department === filters.department);
    }

    setFilteredEmployees(filtered);
  };

  const handleAddEmployee = (employeeData: { id: string; name: string; position: string; department: string }) => {
    const completeEmployeeData = {
      ...employeeData,
      salary: 0,
      status: 'Active' as EmployeeStatus,
    };
    addEmployee(completeEmployeeData);
    message.success('Nhân viên đã được thêm thành công!');
    setFormVisible(false);
  };

  return (
    <Card title="Quản lý nhân viên">
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setFormVisible(true)}>
          Thêm Nhân Viên
        </Button>
      </Space>

      <FilterBar onFilter={handleFilter} positions={['Nhân viên', 'Trưởng phòng', 'Giám đốc']} departments={['Kế toán', 'Hành chính', 'Kỹ thuật']} />

      <EmployeeTable employees={filteredEmployees} />

      {/* Form thêm nhân viên trong Modal */}
      <EmployeeForm open={formVisible} onClose={() => setFormVisible(false)} onSubmit={handleAddEmployee} />
    </Card>
  );
}

export default EmployeeList;
