export interface Employee {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  departmentId?: string; // relation to Department
  status?: string;
}
