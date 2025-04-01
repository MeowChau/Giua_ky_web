// src/components/CourseTable/CourseTable.tsx
import React from 'react';
import { Table, Space, Button } from 'antd';
import type { Course } from '../../models/Course/course';

interface CourseTableProps {
  courses: Course[];
  onEdit: (course: Course) => void;
  onDelete: (id: string) => void;
}

const CourseTable: React.FC<CourseTableProps> = ({ courses, onEdit, onDelete }) => {
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Tên khóa học', dataIndex: 'name', key: 'name' },
    { title: 'Giảng viên', dataIndex: 'instructor', key: 'instructor' },
    { 
      title: 'Học viên', 
      dataIndex: 'students', 
      key: 'students',
      sorter: (a: Course, b: Course) => a.students - b.students 
    },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
    {
      title: 'Hành động',
      key: 'actions',
      render: (_: any, record: Course) => (
        <Space>
          <Button type="primary" onClick={() => onEdit(record)}>
            Sửa
          </Button>
          <Button danger onClick={() => onDelete(record.id)}>
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return <Table dataSource={courses} columns={columns} rowKey="id" bordered />;
};

export default CourseTable;