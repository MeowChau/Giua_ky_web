// Lấy danh sách khóa học từ localStorage
export const getCoursesFromLocalStorage = (): any[] => {
    const data = localStorage.getItem('courses');
    return data ? JSON.parse(data) : [];
  };
  
  // Lưu danh sách khóa học vào localStorage
  export const saveCoursesToLocalStorage = (courses: any[]): void => {
    localStorage.setItem('courses', JSON.stringify(courses));
  };
  
  // Dữ liệu mẫu (giả lập API)
  export const fetchCoursesFromAPI = async (): Promise<any[]> => {
    return [
      { id: '1', name: 'Khóa học React', instructor: 'Giảng viên A', students: 25, status: 'Đang mở', description: 'Khóa học cơ bản về React.' },
      { id: '2', name: 'Khóa học TypeScript', instructor: 'Giảng viên B', students: 15, status: 'Đã kết thúc', description: 'Khóa học nâng cao về TypeScript.' },
      { id: '3', name: 'Khóa học Node.js', instructor: 'Giảng viên A', students: 30, status: 'Đang mở', description: 'Khóa học phát triển backend với Node.js.' },
      { id: '4', name: 'Khóa học Python', instructor: 'Giảng viên C', students: 20, status: 'Tạm dừng', description: 'Khóa học lập trình Python cơ bản.' },
      { id: '5', name: 'Khóa học Machine Learning', instructor: 'Giảng viên B', students: 10, status: 'Đang mở', description: 'Khóa học về học máy và trí tuệ nhân tạo.' },
      { id: '6', name: 'Khóa học Java', instructor: 'Giảng viên D', students: 18, status: 'Đang mở', description: 'Khóa học lập trình Java cơ bản.' },
      { id: '7', name: 'Khóa học C++', instructor: 'Giảng viên E', students: 12, status: 'Đã kết thúc', description: 'Khóa học lập trình C++ nâng cao.' },
      { id: '8', name: 'Khóa học HTML & CSS', instructor: 'Giảng viên F', students: 40, status: 'Đang mở', description: 'Khóa học thiết kế giao diện web.' },
      { id: '9', name: 'Khóa học JavaScript', instructor: 'Giảng viên A', students: 35, status: 'Đang mở', description: 'Khóa học lập trình JavaScript cơ bản.' },
      { id: '10', name: 'Khóa học SQL', instructor: 'Giảng viên G', students: 22, status: 'Tạm dừng', description: 'Khóa học quản lý cơ sở dữ liệu SQL.' },
      { id: '11', name: 'Khóa học Angular', instructor: 'Giảng viên B', students: 17, status: 'Đang mở', description: 'Khóa học phát triển frontend với Angular.' },
      { id: '12', name: 'Khóa học Vue.js', instructor: 'Giảng viên C', students: 14, status: 'Đã kết thúc', description: 'Khóa học phát triển frontend với Vue.js.' },
      { id: '13', name: 'Khóa học PHP', instructor: 'Giảng viên D', students: 19, status: 'Đang mở', description: 'Khóa học lập trình PHP cơ bản.' },
      { id: '14', name: 'Khóa học Laravel', instructor: 'Giảng viên E', students: 11, status: 'Đã kết thúc', description: 'Khóa học phát triển web với Laravel.' },
      { id: '15', name: 'Khóa học Ruby on Rails', instructor: 'Giảng viên F', students: 9, status: 'Tạm dừng', description: 'Khóa học phát triển web với Ruby on Rails.' },
      { id: '16', name: 'Khóa học Kotlin', instructor: 'Giảng viên G', students: 13, status: 'Đang mở', description: 'Khóa học lập trình Kotlin cho Android.' },
      { id: '17', name: 'Khóa học Swift', instructor: 'Giảng viên A', students: 8, status: 'Đang mở', description: 'Khóa học lập trình Swift cho iOS.' },
      { id: '18', name: 'Khóa học Docker', instructor: 'Giảng viên B', students: 21, status: 'Đang mở', description: 'Khóa học triển khai ứng dụng với Docker.' },
      { id: '19', name: 'Khóa học DevOps', instructor: 'Giảng viên C', students: 16, status: 'Đang mở', description: 'Khóa học về DevOps và CI/CD.' },
      { id: '20', name: 'Khóa học AI', instructor: 'Giảng viên D', students: 7, status: 'Đang mở', description: 'Khóa học trí tuệ nhân tạo nâng cao.' },
    ];
  };
  
  // Khởi tạo dữ liệu mẫu vào localStorage nếu chưa có
  export const initializeCourses = async (): Promise<void> => {
    const existingCourses = getCoursesFromLocalStorage();
    if (existingCourses.length === 0) {
      const sampleCourses = await fetchCoursesFromAPI();
      saveCoursesToLocalStorage(sampleCourses);
    }
  };