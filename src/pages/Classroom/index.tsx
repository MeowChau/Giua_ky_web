import React, { useState, useEffect } from 'react';
import { Card, Button, Space, message } from 'antd';
import type { Classroom } from '../../models/classroomModel';
import { RESPONSIBLE_PERSONS } from '../../models/classroomModel';
import type { ClassroomType } from '../../models/classroomModel';
import { loadClassrooms, saveClassrooms, exportClassroomsToCSV, parseCSV } from '../../services/classroomService'; 
import ClassroomForm from '../../components/Classroom/ClassroomForm';
import ClassroomTable from '../../components/Classroom/ClassroomTable';
import ClassroomToolbar from '../../components/Classroom/ClassroomToolbar';

const ClassroomPage: React.FC = () => {
  // State management
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState<ClassroomType | 'all'>('all');
  const [sortOrder, setSortOrder] = useState<'ascend' | 'descend' | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  // Load data from localStorage on initial render
  useEffect(() => {
    setClassrooms(loadClassrooms());
  }, []);

  // Save to localStorage whenever classrooms change
  useEffect(() => {
    saveClassrooms(classrooms);
  }, [classrooms]);

  // Filtered and sorted data
  const filteredData = classrooms
    .filter((item) => {
      const matchesSearch = 
        item.code.toLowerCase().includes(searchText.toLowerCase()) ||
        item.name.toLowerCase().includes(searchText.toLowerCase());
      const matchesType = filterType === 'all' || item.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      if (sortOrder === 'ascend') {
        return a.capacity - b.capacity;
      } else if (sortOrder === 'descend') {
        return b.capacity - a.capacity;
      }
      return 0;
    });

  const showModal = (record?: Classroom) => {
    if (record) {
      setEditingId(record.id);
    } else {
      setEditingId(null);
    }
    setIsModalVisible(true);
  };

  const handleOk = async (values: Classroom) => {
    try {
      setLoading(true);
      
      if (editingId) {
        // Update existing classroom
        setClassrooms(classrooms.map(c => 
          c.id === editingId ? { ...values, id: editingId } : c
        ));
        message.success('Cập nhật phòng học thành công!', 2);
      } else {
        // Add new classroom
        const newClassroom = {
          ...values,
          id: `room-${Date.now()}`,
        };
        setClassrooms([...classrooms, newClassroom]);
        message.success('Thêm phòng học mới thành công!', 2);
      }
      
      setIsModalVisible(false);
    } catch (error) {
      message.error('Có lỗi xảy ra! Vui lòng kiểm tra lại thông tin.', 3);
      console.error('Validation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    const classroom = classrooms.find(c => c.id === id);
    if (classroom && classroom.capacity >= 30) {
      message.error('Chỉ được xóa phòng dưới 30 chỗ ngồi!', 3);
      return;
    }
    
    setClassrooms(classrooms.filter(c => c.id !== id));
    message.success('Xóa phòng học thành công!', 2);
  };

  const handleBulkDelete = () => {
    const hasLargeClassroom = selectedRows.some(r => r.capacity >= 30);
    if (hasLargeClassroom) {
      message.error('Không thể xóa phòng có từ 30 chỗ ngồi trở lên');
      return;
    }

    const newClassrooms = classrooms.filter(
      c => !selectedRows.some(r => r.id === c.id)
    );
    setClassrooms(newClassrooms);
    setSelectedRows([]);
    message.success(`Đã xóa thành công ${selectedRows.length} phòng học`);
  };

  const handleExport = () => {
    const data = filteredData.map(({ id, ...rest }) => rest);
    exportClassroomsToCSV(data);
    message.success(`Đã xuất ${data.length} phòng học ra file CSV`);
  };

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = parseCSV(content);
        
        if (!parsed.length || !parsed[0].code || !parsed[0].name) {
          setImportError('File CSV không đúng định dạng!');
          return;
        }
        
        const newClassrooms = parsed.map((row: any) => ({
          id: `room-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          code: row.code,
          name: row.name,
          capacity: parseInt(row.capacity) || 20,
          type: (['theory', 'practice', 'auditorium'].includes(row.type) 
            ? row.type 
            : 'theory') as ClassroomType,
          responsiblePerson: row.responsiblePerson || RESPONSIBLE_PERSONS[0],
        }));
        
        setClassrooms([...classrooms, ...newClassrooms]);
        setImportError(null);
        message.success(`Đã nhập thành công ${newClassrooms.length} phòng học`);
      } catch (error) {
        setImportError('Lỗi khi đọc file CSV! Vui lòng kiểm tra lại định dạng file.');
        console.error('Import error:', error);
      }
    };
  };

  return (
    <div className="classroom-page" style={{ padding: 24 }}>
      <Card
        title={<span style={{ fontSize: 18 }}>Quản lý Phòng học</span>}
        extra={
          <Space>
            <Button 
              type="primary" 
              onClick={() => showModal()}
              style={{ fontWeight: 500 }}
            >
              Thêm phòng học
            </Button>
          </Space>
        }
        bordered={false}
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.09)' }}
      >
        <ClassroomToolbar
          searchText={searchText}
          filterType={filterType}
          sortOrder={sortOrder}
          selectedRows={selectedRows}
          importError={importError}
          onSearch={setSearchText}
          onFilterChange={setFilterType}
          onSortChange={setSortOrder}
          onImport={handleImport}
          onExport={handleExport}
          onBulkDelete={handleBulkDelete}
          onClearSelection={() => setSelectedRows([])}
        />
        
        <ClassroomTable
          data={filteredData}
          onEdit={showModal}
          onDelete={handleDelete}
          rowSelection={{
            type: 'checkbox',
            onChange: (_: React.Key[], selected: Classroom[]) => {
              setSelectedRows(selected);
            },
            getCheckboxProps: (record: Classroom) => ({
              disabled: record.capacity >= 30,
            }),
          }}
        />
      </Card>

      <ClassroomForm
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleOk}
        initialValues={editingId ? classrooms.find(c => c.id === editingId) : undefined}
        loading={loading}
        editingId={editingId}
        classrooms={classrooms}
      />
    </div>
  );
};

export default ClassroomPage;