import type { Classroom } from '../models/classroomModel';

// Hàm chuyển đổi object thành chuỗi CSV
export const convertToCSV = (objArray: any[]) => {
  const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
  let str = '';
  
  // Header row
  const headers = Object.keys(array[0]);
  str += headers.join(',') + '\r\n';
  
  // Data rows
  for (let i = 0; i < array.length; i++) {
    let line = '';
    for (const key in array[i]) {
      if (line !== '') line += ',';
      line += `"${String(array[i][key]).replace(/"/g, '""')}"`;
    }
    str += line + '\r\n';
  }
  
  return str;
};

// Hàm phân tích chuỗi CSV thành mảng object
export const parseCSV = (csvString: string) => {
  const lines = csvString.split('\n');
  const result = [];
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i]) continue;
    
    const obj: any = {};
    const currentline = lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j] ? currentline[j].trim().replace(/"/g, '') : '';
    }
    
    result.push(obj);
  }
  
  return result;
};

export const loadClassrooms = (): Classroom[] => {
  const saved = localStorage.getItem('classrooms');
  const DEFAULT_CLASSROOMS: Classroom[] = []; // Define a default value
  return saved ? JSON.parse(saved) : DEFAULT_CLASSROOMS;
};

export const saveClassrooms = (classrooms: Classroom[]) => {
  localStorage.setItem('classrooms', JSON.stringify(classrooms));
};

export const exportClassroomsToCSV = (data: Omit<Classroom, 'id'>[]) => {
  const csvContent = convertToCSV(data);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `danh-sach-phong-hoc_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};