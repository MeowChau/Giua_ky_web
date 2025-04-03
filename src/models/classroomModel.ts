export type ClassroomType = 'theory' | 'practice' | 'auditorium';

export interface Classroom {
  id: string;
  code: string;
  name: string;
  capacity: number;
  type: ClassroomType;
  responsiblePerson: string;
}

export const DEFAULT_CLASSROOMS: Classroom[] = [
  {
    id: 'room-1',
    code: 'A101',
    name: 'Phòng học A101',
    capacity: 50,
    type: 'theory',
    responsiblePerson: 'Nguyễn Văn A',
  },
  {
    id: 'room-2',
    code: 'B202',
    name: 'Phòng thực hành B202',
    capacity: 25,
    type: 'practice',
    responsiblePerson: 'Trần Thị B',
  },
  {
    id: 'room-3',
    code: 'C303',
    name: 'Hội trường C303',
    capacity: 200,
    type: 'auditorium',
    responsiblePerson: 'Lê Văn C',
  },
];

export const RESPONSIBLE_PERSONS = [
  'Nguyễn Văn A',
  'Trần Thị B',
  'Lê Văn C',
  'Phạm Thị D',
  'Hoàng Văn E',
];