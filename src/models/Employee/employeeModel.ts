import { useState, useEffect } from 'react';
import type { Employee } from './employeeTypes';

export const useEmployeeModel = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const storedEmployees = localStorage.getItem('employees');
    if (storedEmployees) {
      setEmployees(JSON.parse(storedEmployees));
    }
  }, []);

  const saveEmployees = (newEmployees: Employee[]) => {
    setEmployees(newEmployees);
    localStorage.setItem('employees', JSON.stringify(newEmployees));
  };

  return { employees, saveEmployees };
};