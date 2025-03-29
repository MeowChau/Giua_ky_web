import { useState, useEffect } from 'react';
import { Button, Input, Select } from 'antd';
import TablePhongHoc from '@/components/PhongHoc/TablePhongHoc';
import FormPhongHoc from '@/components/PhongHoc/FormPhongHoc';
import usePhongHocModel from '@/models/PhongHoc/phonghoc';

const { Search } = Input;
const { Option } = Select;

export default function PhongHocPage() {
  const { dsPhongHoc, themPhongHoc, suaPhongHoc } = usePhongHocModel();
  const [visible, setVisible] = useState(false);
  const [editingPhong, setEditingPhong] = useState<Record<string, any> | undefined>(undefined);
  const [searchText, setSearchText] = useState('');
  const [filterLoaiPhong, setFilterLoaiPhong] = useState('');
  const [filteredData, setFilteredData] = useState(dsPhongHoc);

  useEffect(() => {
    const filtered = dsPhongHoc
      .filter((phong) =>
        phong.maPhong.includes(searchText) ||
        phong.tenPhong.toLowerCase().includes(searchText.toLowerCase())
      )
      .filter((phong) => (filterLoaiPhong ? phong.loaiPhong === filterLoaiPhong : true))
      .sort((a, b) => a.soChoNgoi - b.soChoNgoi);

    setFilteredData(filtered);
  }, [dsPhongHoc, searchText, filterLoaiPhong]);

  const handleAdd = () => {
    setEditingPhong(undefined);
    setVisible(true);
  };

  const handleEdit = (phong: any) => {
    setEditingPhong(phong);
    setVisible(true);
  };

  const handleFormSubmit = (phong: any) => {
    if (editingPhong) {
      suaPhongHoc(phong);
    } else {
      themPhongHoc(phong);
    }
    setVisible(false);
  };

  useEffect(() => {
    setFilteredData(dsPhongHoc);
  }, [dsPhongHoc]);

  return (
    <div>
      <h2>Quản lý Phòng Học</h2>
      <div style={{ marginBottom: 16, display: 'flex', gap: 8 }}>
        <Search
          placeholder="Tìm kiếm theo mã phòng, tên phòng"
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 300 }}
        />
        <Select
          placeholder="Lọc theo loại phòng"
          allowClear
          onChange={setFilterLoaiPhong}
          style={{ width: 200 }}
        >
          <Option value="Lý thuyết">Lý thuyết</Option>
          <Option value="Thực hành">Thực hành</Option>
          <Option value="Hội trường">Hội trường</Option>
        </Select>
        <Button type="primary" onClick={handleAdd}>Thêm Phòng</Button>
      </div>
      <TablePhongHoc onEdit={handleEdit} dataSource={filteredData} />
      <FormPhongHoc
        visible={visible}
        onClose={() => setVisible(false)}
        editingPhong={editingPhong}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}