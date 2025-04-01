import type { Course } from '../../models/Course/course';

export const validateCourseName = (courses: Course[], name: string, editingId?: string): boolean => {
  return courses.some(course => 
    course.name === name && (!editingId || course.id !== editingId)
  );
};

export const filterCourses = (
  courses: Course[],
  searchTerm: string,
  selectedInstructor: string | null,
  selectedStatus: string | null
): Course[] => {
  let result = [...courses];
  
  if (searchTerm) {
    result = result.filter(course => 
      course.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }
  
  if (selectedInstructor) {
    result = result.filter(course => course.instructor === selectedInstructor);
  }
  
  if (selectedStatus) {
    result = result.filter(course => course.status === selectedStatus);
  }
  
  return result;
};