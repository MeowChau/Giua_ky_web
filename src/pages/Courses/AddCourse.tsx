import React from 'react';
import CourseForm from './CourseForm';

const AddCourse: React.FC = () => {
  return (
    <div>
      <h2>Thêm Khóa Học</h2>
      <CourseForm mode="add" />
    </div>
  );
};

export default AddCourse;