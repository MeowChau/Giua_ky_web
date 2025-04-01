import React from 'react';
import { Table, Tag, Space, Button, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Employee } from '@/models/Employee/employee';
import { POSITIONS, DEPARTMENTS } from '@/models/Employee/employee';

interface EmployeeTableProps {
  data: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({ 
  data, 
  onEdit, 
  onDelete, 
  loading 
}) => {
  const columns: ColumnsType<Employee> = [
    {
      title: 'Mã nhân viên',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id.localeCompare(b.id),
    },
    {
      title: 'Họ tên',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Chức vụ',
      dataIndex: 'position',
      key: 'position',
      filters: POSITIONS.map(pos => ({ text: pos, value: pos })),
      onFilter: (value, record) => record.position === value,
    },
    {
      title: 'Phòng ban',
      dataIndex: 'department',
      key: 'department',
      filters: DEPARTMENTS.map(dept => ({ text: dept, value: dept })),
      onFilter: (value, record) => record.department === value,
    },
    {
      title: 'Lương',
      dataIndex: 'salary',
      key: 'salary',
      render: (salary: number) => `${salary.toLocaleString('vi-VN')} VND`,
      sorter: (a, b) => a.salary - b.salary,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Đã ký hợp đồng' ? 'green' : 'orange'}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => onEdit(record)}>
            Chỉnh sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa nhân viên này?"
            onConfirm={() => onDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
            disabled={record.status === 'Đã ký hợp đồng'}
          >
            <Button 
              type="link" 
              danger 
              disabled={record.status === 'Đã ký hợp đồng'}
            >
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table 
      columns={columns} 
      dataSource={data} 
      rowKey="id"
      bordered
      loading={loading}
    />
  );
};

export default EmployeeTable;