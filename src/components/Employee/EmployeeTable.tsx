import React, { useState, useEffect } from 'react';
import { Table, Input, Select, Tag } from 'antd';
import type { Employee } from '@/models/Employee/employeeTypes';

const { Search } = Input;
const { Option } = Select;

interface EmployeeTableProps {
  employees: Employee[];
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ employees }) => {
  const [filteredData, setFilteredData] = useState<Employee[]>(employees);
  const [, setSearchText] = useState('');

  useEffect(() => {
    setFilteredData(employees);
  }, [employees]);

  // Hàm tìm kiếm nhân viên
  const handleSearch = (value: string) => {
    setSearchText(value);
    setFilteredData(
      employees.filter(
        (emp) =>
          emp.name.toLowerCase().includes(value.toLowerCase()) ||
          emp.id.includes(value)
      )
    );
  };

  // Hàm lọc theo chức vụ hoặc phòng ban
  const handleFilter = (value: string, field: keyof Employee) => {
    setFilteredData(employees.filter((emp) => emp[field] === value));
  };

  const columns = [
    { title: 'Mã NV', dataIndex: 'id', key: 'id', sorter: (a: Employee, b: Employee) => a.id.localeCompare(b.id) },
    { title: 'Họ Tên', dataIndex: 'name', key: 'name' },
    { title: 'Chức vụ', dataIndex: 'position', key: 'position' },
    { title: 'Phòng Ban', dataIndex: 'department', key: 'department' },
    { title: 'Lương', dataIndex: 'salary', key: 'salary', sorter: (a: Employee, b: Employee) => b.salary - a.salary },
    {
      title: 'Trạng Thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Đã ký hợp đồng' ? 'green' : 'orange'}>{status}</Tag>
      ),
    },
  ];

  return (
    <div>
      <Search placeholder="Tìm kiếm theo mã hoặc họ tên" onSearch={handleSearch} style={{ marginBottom: 16 }} />
      <Select placeholder='Lọc theo chức vụ' onChange={(value) => handleFilter(value, 'position')} style={{ marginRight: 8 }}>
        <Option value="Nhân viên">Nhân viên</Option>
        <Option value="Quản lý">Quản lý</Option>
      </Select>
      <Select placeholder='Lọc theo phòng ban' onChange={(value) => handleFilter(value, 'department')}>
        <Option value="IT">IT</Option>
        <Option value="HR">HR</Option>
      </Select>
      <Table dataSource={filteredData} columns={columns} rowKey="id" />
    </div>
  );
};

export default EmployeeTable;
