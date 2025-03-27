import { useState } from 'react';

// Định nghĩa kiểu dữ liệu cho khóa học
type Course = {
  id: string;
  name: string;
  students: number;
};

// Hàm tiện ích: Lưu danh sách khóa học vào localStorage
const saveCoursesToLocalStorage = (courses: Course[]) => {
  localStorage.setItem('courses', JSON.stringify(courses));
};

// Hàm tiện ích: Lấy danh sách khóa học từ localStorage
const getCoursesFromLocalStorage = (): Course[] => {
  const data = localStorage.getItem('courses');
  return data ? JSON.parse(data) : [];
};

// Hàm tiện ích: Khởi tạo dữ liệu mẫu nếu localStorage chưa có dữ liệu
const initializeCourses = async () => {
  const existingCourses = getCoursesFromLocalStorage();
  if (existingCourses.length === 0) {
    const sampleCourses: Course[] = [
      { id: '1', name: 'Math', students: 10 },
      { id: '2', name: 'Science', students: 15 },
    ];
    saveCoursesToLocalStorage(sampleCourses);
  }
};

export default function useCourseModel() {
  const [courses, setCourses] = useState<Course[]>([]);

  // Lấy danh sách khóa học
  const fetchCourses = async () => {
    await initializeCourses(); // Khởi tạo dữ liệu mẫu nếu cần
    const data = getCoursesFromLocalStorage();
    setCourses(data);
  };

  // Lấy thông tin khóa học theo ID
  const fetchCourseById = (id: string): Course | undefined => {
    if (!id) {
      console.error('ID không hợp lệ');
      return undefined;
    }
    return courses.find((course) => course.id === id);
  };

  // Thêm mới khóa học
  const addCourse = (course: Course): boolean => {
    if (!course.name) {
      console.error('Tên khóa học không được để trống');
      return false;
    }
    const newCourses = [
      ...courses,
      { ...course, id: Date.now().toString(), students: 0 },
    ];
    saveCoursesToLocalStorage(newCourses);
    setCourses(newCourses);
    return true;
  };

  // Cập nhật thông tin khóa học
  const updateCourse = (id: string, updatedCourse: Partial<Course>): boolean => {
    if (!id) {
      console.error('ID không hợp lệ');
      return false;
    }
    const courseExists = courses.some((course) => course.id === id);
    if (!courseExists) {
      console.error('Khóa học không tồn tại');
      return false;
    }
    const newCourses = courses.map((course) =>
      course.id === id ? { ...course, ...updatedCourse } : course
    );
    saveCoursesToLocalStorage(newCourses);
    setCourses(newCourses);
    return true;
  };

  // Xóa khóa học
  const deleteCourse = (id: string): boolean => {
    if (!id) {
      console.error('ID không hợp lệ');
      return false;
    }
    const course = courses.find((course) => course.id === id);
    if (!course) {
      console.error('Khóa học không tồn tại');
      return false;
    }
    if (course.students > 0) {
      console.error('Không thể xóa khóa học vì đã có học viên');
      return false;
    }
    const newCourses = courses.filter((course) => course.id !== id);
    saveCoursesToLocalStorage(newCourses);
    setCourses(newCourses);
    return true;
  };

  return {
    courses,
    fetchCourses,
    fetchCourseById,
    addCourse,
    updateCourse,
    deleteCourse,
  };
}