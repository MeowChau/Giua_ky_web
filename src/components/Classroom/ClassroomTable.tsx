import React from 'react';
import { Table, Tag, Badge, Typography, Button, Popconfirm, Space, Alert } from 'antd';
import type { Classroom, ClassroomType } from '../../models/classroomModel';

const { Text } = Typography;

interface ClassroomTableProps {
  data: Classroom[];
  onEdit: (record: Classroom) => void;
  onDelete: (id: string) => void;
  rowSelection?: any;
}

const ClassroomTable: React.FC<ClassroomTableProps> = ({ data, onEdit, onDelete, rowSelection }) => {
  const columns = [
    {
      title: 'Mã phòng',
      dataIndex: 'code',
      key: 'code',
      sorter: (a: Classroom, b: Classroom) => a.code.localeCompare(b.code),
    },
    {
      title: 'Tên phòng',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Classroom, b: Classroom) => a.name.localeCompare(b.name),
    },
    {
      title: 'Số chỗ ngồi',
      dataIndex: 'capacity',
      key: 'capacity',
      sorter: (a: Classroom, b: Classroom) => a.capacity - b.capacity,
      render: (capacity: number) => (
        <Badge 
          count={capacity} 
          style={{ 
            backgroundColor: capacity >= 100 ? '#f50' : capacity >= 50 ? '#2db7f5' : '#87d068'
          }} 
        />
      ),
    },
    {
      title: 'Loại phòng',
      dataIndex: 'type',
      key: 'type',
      render: (type: ClassroomType) => {
        const typeMap = {
          'theory': { text: 'Lý thuyết', color: 'blue' },
          'practice': { text: 'Thực hành', color: 'green' },
          'auditorium': { text: 'Hội trường', color: 'orange' },
        };
        return <Tag color={typeMap[type].color}>{typeMap[type].text}</Tag>;
      },
      filters: [
        { text: 'Lý thuyết', value: 'theory' },
        { text: 'Thực hành', value: 'practice' },
        { text: 'Hội trường', value: 'auditorium' },
      ],
      onFilter: (value: string | number | boolean, record: Classroom) => record.type === value,
    },
    {
      title: 'Người phụ trách',
      dataIndex: 'responsiblePerson',
      key: 'responsiblePerson',
      render: (person: string) => <Text ellipsis>{person}</Text>,
    },
    {
      title: 'Hành động',
      key: 'action',
      width: 150,
      render: (_: any, record: Classroom) => (
        <Space size="small">
          <Button 
            size="small" 
            onClick={() => onEdit(record)}
            title="Chỉnh sửa"
          >
            Sửa
          </Button>
          <Popconfirm
            title={<>
              <p>Bạn có chắc chắn muốn xóa phòng học này?</p>
              {record.capacity >= 30 && (
                <Alert 
                  message="Chỉ được xóa phòng dưới 30 chỗ ngồi" 
                  type="error" 
                  showIcon 
                  style={{ marginTop: 8 }}
                />
              )}
            </>}
            onConfirm={() => onDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
            disabled={record.capacity >= 30}
            placement="left"
          >
            <Button 
              size="small" 
              danger 
              disabled={record.capacity >= 30}
              title={record.capacity >= 30 ? 'Không thể xóa phòng lớn' : 'Xóa'}
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
      pagination={{ 
        pageSize: 10, 
        showSizeChanger: true,
        showTotal: (total) => `Tổng ${total} phòng học`,
      }}
      rowSelection={rowSelection}
      scroll={{ x: 1000 }}
      sticky
    />
  );
};

export default ClassroomTable;