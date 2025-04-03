import React from 'react';
import { 
  Space, 
  Select, 
  Input, 
  Button, 
  Divider, 
  Alert, 
  Typography, 
  Upload
} from 'antd';
import { ExportOutlined, ImportOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ClassroomType } from '../../models/classroomModel';

const { Search } = Input;
const { Option } = Select;
const { Text } = Typography;

interface ClassroomToolbarProps {
  searchText: string;
  filterType: ClassroomType | 'all';
  sortOrder: 'ascend' | 'descend' | null;
  selectedRows: any[];
  importError: string | null;
  onSearch: (value: string) => void;
  onFilterChange: (value: ClassroomType | 'all') => void;
  onSortChange: (order: 'ascend' | 'descend' | null) => void;
  onImport: (file: File) => void;
  onExport: () => void;
  onBulkDelete: () => void;
  onClearSelection: () => void;
}

const ClassroomToolbar: React.FC<ClassroomToolbarProps> = ({
  searchText,
  filterType,
  sortOrder,
  selectedRows,
  importError,
  onSearch,
  onFilterChange,
  onSortChange,
  onImport,
  onExport,
  onBulkDelete,
  onClearSelection,
}) => {
  const uploadRef = React.useRef<any>();

  const beforeUpload = (file: File) => {
    onImport(file);
    return false;
  };

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Space wrap>
          <Search
            placeholder="Tìm kiếm theo mã hoặc tên phòng"
            allowClear
            enterButton="Tìm kiếm"
            style={{ width: 300 }}
            onSearch={onSearch}
            onChange={(e) => onSearch(e.target.value)}
            value={searchText}
          />
          
          <Select
            value={filterType}
            style={{ width: 180 }}
            onChange={onFilterChange}
            placeholder="Lọc theo loại phòng"
          >
            <Option value="all">Tất cả loại phòng</Option>
            <Option value="theory">Lý thuyết</Option>
            <Option value="practice">Thực hành</Option>
            <Option value="auditorium">Hội trường</Option>
          </Select>
          
          <Button.Group>
            <Button 
              onClick={() => onSortChange('ascend')}
              type={sortOrder === 'ascend' ? 'primary' : 'default'}
            >
              Sắp xếp tăng dần
            </Button>
            <Button 
              onClick={() => onSortChange('descend')}
              type={sortOrder === 'descend' ? 'primary' : 'default'}
            >
              Sắp xếp giảm dần
            </Button>
            <Button 
              onClick={() => onSortChange(null)}
              type={!sortOrder ? 'primary' : 'default'}
            >
              Bỏ sắp xếp
            </Button>
          </Button.Group>
          
          <Divider type="vertical" />
          
          <Space>
            <Upload 
              accept=".csv"
              beforeUpload={beforeUpload}
              showUploadList={false}
              ref={uploadRef}
            >
              <Button 
                icon={<ImportOutlined />} 
                type="dashed"
                title="Nhập từ CSV"
              >
                Nhập dữ liệu
              </Button>
            </Upload>
            
            <Button 
              icon={<ExportOutlined />} 
              onClick={onExport}
              type="dashed"
              title="Xuất ra CSV"
            >
              Xuất dữ liệu
            </Button>
          </Space>
        </Space>
      </div>
      
      {importError && (
        <Alert 
          message={importError} 
          type="error" 
          showIcon 
          closable 
          style={{ marginBottom: 16 }}
          onClose={() => onClearSelection()}
        />
      )}
      
      {selectedRows.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <Space>
            <Text strong>Đã chọn {selectedRows.length} phòng:</Text>
            <Button 
              danger 
              icon={<DeleteOutlined />} 
              onClick={onBulkDelete}
              disabled={selectedRows.some((r: any) => r.capacity >= 30)}
            >
              Xóa hàng loạt
            </Button>
            <Button onClick={onClearSelection}>Bỏ chọn</Button>
          </Space>
        </div>
      )}
    </>
  );
};

export default ClassroomToolbar;