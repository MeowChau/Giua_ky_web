// src/components/CourseFilter/CourseFilter.tsx
import React from 'react';
import { Input, Select, Button, Space } from 'antd';
import { instructors, statuses } from '../../services/Course/constants';

interface CourseFilterProps {
  onSearch: (term: string) => void;
  onInstructorChange: (instructor: string | null) => void;
  onStatusChange: (status: string | null) => void;
  onAddCourse: () => void;
}

const CourseFilter: React.FC<CourseFilterProps> = ({
  onSearch,
  onInstructorChange,
  onStatusChange,
  onAddCourse,
}) => {
  return (
    <Space style={{ marginBottom: 16 }}>
      <Input.Search 
        placeholder="Tìm kiếm khóa học" 
        onChange={(e) => onSearch(e.target.value)} 
        style={{ width: 200 }} 
      />
      <Select 
        placeholder="Chọn giảng viên" 
        onChange={onInstructorChange} 
        allowClear 
        style={{ width: 200 }}
      >
        {instructors.map(instructor => (
          <Select.Option key={instructor} value={instructor}>
            {instructor}
          </Select.Option>
        ))}
      </Select>
      <Select 
        placeholder="Chọn trạng thái" 
        onChange={onStatusChange} 
        allowClear 
        style={{ width: 200 }}
      >
        {statuses.map(status => (
          <Select.Option key={status} value={status}>
            {status}
          </Select.Option>
        ))}
      </Select>
      <Button type="primary" onClick={onAddCourse}>
        Thêm khóa học
      </Button>
    </Space>
  );
};

export default CourseFilter;