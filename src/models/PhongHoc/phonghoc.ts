import { useState, useEffect } from 'react';
import { message } from 'antd';

export type PhongHoc = {
  maPhong: string;
  tenPhong: string;
  soChoNgoi: number;
  loaiPhong: 'Lý thuyết' | 'Thực hành' | 'Hội trường';
  nguoiPhuTrach: string;
};

const LOCAL_STORAGE_KEY = 'phongHoc';

export default function usePhongHocModel() {
  const [dsPhongHoc, setDsPhongHoc] = useState<PhongHoc[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]');
    setDsPhongHoc(data);
  }, []);

  const saveToLocalStorage = (data: PhongHoc[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    setDsPhongHoc([...data]); // Cập nhật state để re-render
  };

  const kiemTraDuLieu = (phong: PhongHoc): boolean => {
    if (!phong.maPhong || !phong.tenPhong || !phong.nguoiPhuTrach || !phong.loaiPhong) {
      message.error('Vui lòng nhập đầy đủ thông tin phòng học!');
      return false;
    }
    if (phong.maPhong.length > 10) {
      message.error('Mã phòng không được quá 10 ký tự!');
      return false;
    }
    if (phong.tenPhong.length > 50) {
      message.error('Tên phòng không được quá 50 ký tự!');
      return false;
    }
    return true;
  };

  const themPhongHoc = (phong: PhongHoc) => {
    if (!kiemTraDuLieu(phong)) return;

    setDsPhongHoc((prev) => {
      if (prev.some((p) => p.tenPhong === phong.tenPhong)) {
        message.error('Tên phòng đã tồn tại!');
        return prev;
      }
      const updated = [...prev, phong];
      saveToLocalStorage(updated);
      message.success('Thêm phòng học thành công!');
      return updated;
    });
  };

  const suaPhongHoc = (phong: PhongHoc) => {
    if (!kiemTraDuLieu(phong)) return;

    setDsPhongHoc((prev) => {
      const updated = prev.map((p) => (p.maPhong === phong.maPhong ? phong : p));
      saveToLocalStorage(updated);
      message.success('Cập nhật phòng học thành công!');
      return updated;
    });
  };

  const xoaPhongHoc = (maPhong: string) => {
    setDsPhongHoc((prev) => {
      const phong = prev.find((ph) => ph.maPhong === maPhong);
      if (phong && phong.soChoNgoi >= 30) {
        message.error('Không thể xóa phòng có từ 30 chỗ ngồi trở lên!');
        return prev;
      }
      const updated = prev.filter((ph) => ph.maPhong !== maPhong);
      saveToLocalStorage(updated);
      message.success('Xóa phòng học thành công!');
      return updated;
    });
  };

  return { dsPhongHoc, themPhongHoc, suaPhongHoc, xoaPhongHoc };
}
