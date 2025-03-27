// Kiểm tra tên khóa học không trùng
export const validateCourseName = (name: string, courses: any[]) => {
    return !courses.some((course) => course.name.toLowerCase() === name.toLowerCase());
  };
  
  // Kiểm tra các trường dữ liệu không được để trống
  export const validateCourseFields = (course: any) => {
    if (!course.name || course.name.trim() === '') {
      return 'Tên khóa học không được để trống!';
    }
    if (!course.instructor || course.instructor.trim() === '') {
      return 'Giảng viên không được để trống!';
    }
    if (!course.status || course.status.trim() === '') {
      return 'Trạng thái không được để trống!';
    }
    return null; // Không có lỗi
  };