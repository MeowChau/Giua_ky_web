export const POSITIONS = [
    'Nhân viên',
    'Trưởng phòng',
    'Phó giám đốc',
    'Giám đốc',
    'Kế toán',
    'Nhân sự'
  ] as const;
  
  export const DEPARTMENTS = [
    'Kế toán',
    'Nhân sự',
    'Kinh doanh',
    'Công nghệ',
    'Hành chính',
    'Marketing'
  ] as const;
  
  export const STATUS_OPTIONS = ['Đã ký hợp đồng', 'Thử việc'] as const;
  
  export type Position = typeof POSITIONS[number];
  export type Department = typeof DEPARTMENTS[number];
  export type Status = typeof STATUS_OPTIONS[number];
  
  export interface Employee {
    id: string;
    name: string;
    position: Position;
    department: Department;
    salary: number;
    status: Status;
  }