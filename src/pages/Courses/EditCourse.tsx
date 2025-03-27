import React from 'react';
import { useParams } from 'react-router-dom';
import CourseForm from './CourseForm';

const EditCourse: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h2>Chỉnh Sửa Khóa Học</h2>
      <CourseForm mode="edit" courseId={id} />
    </div>
  );
};

export default EditCourse;