import { Table, Button } from 'antd';
import usePhongHocModel from '@/models/PhongHoc/phonghoc';

export default function TablePhongHoc({ onEdit }: any) {
  const { dsPhongHoc, xoaPhongHoc } = usePhongHocModel();

  const columns = [
    { title: 'Mã Phòng', dataIndex: 'maPhong' },
    { title: 'Tên Phòng', dataIndex: 'tenPhong' },
    { title: 'Số Chỗ Ngồi', dataIndex: 'soChoNgoi' },
    { title: 'Loại Phòng', dataIndex: 'loaiPhong' },
    { title: 'Người Phụ Trách', dataIndex: 'nguoiPhuTrach' },
    {
      title: 'Hành động',
      render: (record: any) => (
        <>
          <Button onClick={() => onEdit(record)}>Sửa</Button>
          <Button danger onClick={() => xoaPhongHoc(record.maPhong)}>Xóa</Button>
        </>
      )
    }
  ];

  return <Table dataSource={dsPhongHoc} columns={columns} rowKey="maPhong" />;
}