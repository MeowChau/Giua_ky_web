import React, { useState, useEffect } from 'react';
import { message, Modal } from 'antd';
import CourseFilter from '../../components/Course/CourseFilter';
import CourseTable from '../../components/Course/CourseTable';
import CourseFormModal from '../../components/Course/CourseFormModal';
import type { Course } from '../../models/Course/course';
import { STORAGE_KEY } from '../../services/Course/constants';
import { getFromLocalStorage, saveToLocalStorage } from '../../services/Course/localStorageService';
import { filterCourses, validateCourseName } from '../../services/Course/courseService';
const CourseManagementPage: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>(() => getFromLocalStorage(STORAGE_KEY));
    const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedInstructor, setSelectedInstructor] = useState<string | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  
    useEffect(() => {
      saveToLocalStorage(STORAGE_KEY, courses);
      const filtered = filterCourses(courses, searchTerm, selectedInstructor, selectedStatus);
      setFilteredCourses(filtered);
    }, [courses, searchTerm, selectedInstructor, selectedStatus]);
  
    const handleSubmit = (values: Omit<Course, 'id'>) => {
      if (editingCourse) {
        if (validateCourseName(courses, values.name, editingCourse.id)) {
          message.error('Tên khóa học đã tồn tại!');
          return;
        }
        
        const updatedCourses = courses.map(course => 
          course.id === editingCourse.id ? { ...course, ...values } : course
        );
        
        setCourses(updatedCourses);
        message.success('Cập nhật khóa học thành công!');
      } else {
        if (validateCourseName(courses, values.name)) {
          message.error('Tên khóa học đã tồn tại!');
          return;
        }
        
        const newCourse = {
          ...values,
          id: Date.now().toString()
        };
        
        setCourses([...courses, newCourse]);
        message.success('Thêm khóa học thành công!');
      }
      
      setIsModalVisible(false);
      setEditingCourse(null);
    };
  
    const handleDelete = (id: string) => {
      Modal.confirm({
        title: 'Bạn có chắc muốn xóa khóa học này?',
        okText: 'Xóa',
        cancelText: 'Hủy',
        onOk: () => {
          setCourses(courses.filter(course => course.id !== id));
          message.success('Xóa khóa học thành công!');
        },
      });
    };
  
    return (
      <div style={{ padding: 24 }}>
        <CourseFilter
          onSearch={setSearchTerm}
          onInstructorChange={setSelectedInstructor}
          onStatusChange={setSelectedStatus}
          onAddCourse={() => {
            setIsModalVisible(true);
            setEditingCourse(null);
          }}
        />
        
        <CourseTable
          courses={filteredCourses}
          onEdit={(course) => {
            setEditingCourse(course);
            setIsModalVisible(true);
          }}
          onDelete={handleDelete}
        />
        
        <CourseFormModal
          visible={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
            setEditingCourse(null);
          }}
          onSubmit={handleSubmit}
          initialValues={editingCourse}
        />
      </div>
    );
  };
  
  export default CourseManagementPage;