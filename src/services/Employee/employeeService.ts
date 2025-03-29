import type { Employee } from '@/models/Employee/employeeTypes';

export const getEmployees = (): Employee[] => {
  return JSON.parse(localStorage.getItem('employees') || '[]');
};

export const saveEmployees = (employees: Employee[]) => {
  localStorage.setItem('employees', JSON.stringify(employees));
};

export const addEmployee = (employee: Employee) => {
  const employees = getEmployees();
  employees.push(employee);
  saveEmployees(employees);
};

export const updateEmployee = (updatedEmployee: Employee) => {
  const employees = getEmployees().map((emp) =>
    emp.id === updatedEmployee.id ? updatedEmployee : emp
  );
  saveEmployees(employees);
};

export const deleteEmployee = (id: string) => {
  const employees = getEmployees().filter((emp) => emp.id !== id);
  saveEmployees(employees);
};