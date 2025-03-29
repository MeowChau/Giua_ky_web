import React, { useState } from 'react';
import { Input, Select, Button, Row, Col } from 'antd';
import { SearchOutlined, ReloadOutlined } from '@ant-design/icons';

interface FilterProps {
  onFilter: (filters: { search: string; position: string; department: string }) => void;
  positions: string[];
  departments: string[];
}

const FilterBar: React.FC<FilterProps> = ({ onFilter, positions, departments }) => {
  const [search, setSearch] = useState<string>('');
  const [position, setPosition] = useState<string>('');
  const [department, setDepartment] = useState<string>('');

  const handleFilter = () => {
    onFilter({ search, position, department });
  };

  const resetFilters = () => {
    setSearch('');
    setPosition('');
    setDepartment('');
    onFilter({ search: '', position: '', department: '' });
  };

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
      {/* Ô tìm kiếm theo tên hoặc mã nhân viên */}
      <Col xs={24} sm={12} md={8} lg={6}>
        <Input
          placeholder="Tìm kiếm theo tên hoặc mã NV..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          suffix={<SearchOutlined />}
        />
      </Col>

      {/* Lọc theo chức vụ */}
      <Col xs={24} sm={12} md={8} lg={6}>
        <Select
          placeholder="Chọn chức vụ"
          value={position}
          onChange={setPosition}
          style={{ width: '100%' }}
          allowClear
        >
          {positions.map((pos) => (
            <Select.Option key={pos} value={pos}>
              {pos}
            </Select.Option>
          ))}
        </Select>
      </Col>

      {/* Lọc theo phòng ban */}
      <Col xs={24} sm={12} md={8} lg={6}>
        <Select
          placeholder="Chọn phòng ban"
          value={department}
          onChange={setDepartment}
          style={{ width: '100%' }}
          allowClear
        >
          {departments.map((dept) => (
            <Select.Option key={dept} value={dept}>
              {dept}
            </Select.Option>
          ))}
        </Select>
      </Col>

      {/* Nút tìm kiếm & reset */}
      <Col xs={24} sm={12} md={8} lg={6}>
        <Button type="primary" onClick={handleFilter} icon={<SearchOutlined />} style={{ marginRight: 8 }}>
          Lọc
        </Button>
        <Button onClick={resetFilters} icon={<ReloadOutlined />}>
          Đặt lại
        </Button>
      </Col>
    </Row>
  );
};

export default FilterBar;
