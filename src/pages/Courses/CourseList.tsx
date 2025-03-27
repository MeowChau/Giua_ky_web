import React, { useEffect, useState } from 'react';
import { Table, Input, Select, Button, Space, Popconfirm, message } from 'antd';
import useModel from '../../models/Course/courseModel';
import { Link } from 'react-router-dom';


const { Search } = Input;
const { Option } = Select;

const CourseList: React.FC = () => {
  const { courses, fetchCourses, deleteCourse } = useModel();
  const [searchText, setSearchText] = useState<string>(''); // Tìm kiếm theo tên khóa học
  const [filterStatus, setFilterStatus] = useState<string | undefined>(undefined); // Lọc theo trạng thái
  const [filterInstructor, setFilterInstructor] = useState<string | undefined>(undefined); // Lọc theo giảng viên

  useEffect(() => {
    fetchCourses(); // Lấy danh sách khóa học khi component được render
  }, []);

  const handleDelete = async (id: string) => {
    const success = await deleteCourse(id);
    if (success) {
      message.success('Xóa khóa học thành công!');
    } else {
      message.error('Không thể xóa khóa học vì đã có học viên!');
    }
  };

  // Hàm lọc khóa học
  const filteredCourses = (courses || []).filter((course: any) => {
    const matchesSearchText = course.name.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = filterStatus ? course.status === filterStatus : true;
    const matchesInstructor = filterInstructor ? course.instructor === filterInstructor : true;
    return matchesSearchText && matchesStatus && matchesInstructor;
  });

  // Cấu hình các cột cho bảng
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên khóa học',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giảng viên',
      dataIndex: 'instructor',
      key: 'instructor',
    },
    {
      title: 'Số lượng học viên',
      dataIndex: 'students',
      key: 'students',
      sorter: (a: any, b: any) => a.students - b.students, // Sắp xếp theo số lượng học viên
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: any) => (
        <Space>
          <Link to={`/courses/edit/${record.id}`}>Chỉnh sửa</Link>
          <Popconfirm
            title="Bạn có chắc chắn muốn xóa khóa học này không?"
            onConfirm={() => handleDelete(record.id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button danger>Xóa</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        {/* Tìm kiếm theo tên khóa học */}
        <Search
          placeholder="Tìm kiếm khóa học"
          onSearch={(value) => setSearchText(value)}
          enterButton
        />

        {/* Bộ lọc theo trạng thái */}
        <Select
          placeholder="Lọc theo trạng thái"
          onChange={(value) => setFilterStatus(value)}
          allowClear
        >
          <Option value="Đang mở">Đang mở</Option>
          <Option value="Đã kết thúc">Đã kết thúc</Option>
          <Option value="Tạm dừng">Tạm dừng</Option>
        </Select>

        {/* Bộ lọc theo giảng viên */}
        <Select
          placeholder="Lọc theo giảng viên"
          onChange={(value) => setFilterInstructor(value)}
          allowClear
        >
          <Option value="Giảng viên A">Giảng viên A</Option>
          <Option value="Giảng viên B">Giảng viên B</Option>
        </Select>

        {/* Nút thêm khóa học */}
        <Link to="/courses/add">
          <Button type="primary">Thêm khóa học</Button>
        </Link>
      </Space>

      {/* Bảng hiển thị danh sách khóa học */}
      <Table columns={columns} dataSource={filteredCourses} rowKey="id" />
    </div>
  );
};

export default CourseList;