// Định nghĩa trạng thái của nhân viên
export type EmployeeStatus = "Đã ký hợp đồng" | "Thử việc";

// Interface chính cho Employee
export interface Employee {
  id: string; // Mã nhân viên (tự động sinh)
  name: string; // Họ tên (Tối đa 50 ký tự, không chứa ký tự đặc biệt)
  position: string; // Chức vụ (Dropdown)
  department: string; // Phòng ban (Dropdown)
  salary: number; // Lương
  status: EmployeeStatus; // Trạng thái (Đã ký hợp đồng, Thử việc)
}

// Interface cho form nhập dữ liệu nhân viên
export interface EmployeeFormValues {
  name: string;
  position: string;
  department: string;
  salary: number;
  status: EmployeeStatus;
}
