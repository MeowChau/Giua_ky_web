import usePhongHocModel from '@/models/PhongHoc/phonghoc';

export default function usePhongHocService() {
	const { dsPhongHoc, themPhongHoc, suaPhongHoc, xoaPhongHoc } = usePhongHocModel();
	return { dsPhongHoc, themPhongHoc, suaPhongHoc, xoaPhongHoc };
}
