import { useLocalStorageState } from 'ahooks';
import type { Employee } from '../../models/Employee/employee';

export const useEmployeeService = () => {
  const [employees, setEmployees] = useLocalStorageState<Employee[]>('employee-data', {
    defaultValue: []
  });

  const generateEmployeeId = () => {
    const timestamp = Date.now().toString().slice(-4);
    const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    return `NV-${timestamp}${random}`;
  };

  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    const newEmployee: Employee = {
      id: generateEmployeeId(),
      ...employee
    };
    setEmployees(prev => [...(prev || []), newEmployee]);
    return newEmployee;
  };

  const updateEmployee = (id: string, employee: Partial<Employee>) => {
    setEmployees(prev => 
      (prev || []).map(emp => 
        emp.id === id ? { ...emp, ...employee } : emp
      )
    );
  };

  const deleteEmployee = (id: string) => {
    setEmployees(prev => (prev || []).filter(emp => emp.id !== id));
  };

  const getEmployees = () => employees || [];

  return {
    employees: getEmployees(),
    addEmployee,
    updateEmployee,
    deleteEmployee,
    generateEmployeeId
  };
};