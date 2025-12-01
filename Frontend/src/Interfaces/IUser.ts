export const UserRole = {
  DEFAULT:"",
  ADMIN: "admin",
  MANAGER: "manager",
  EMPLOYEE: "employee",
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface User {
  userid: number;
  name: string;
  email: string;
  role: UserRole;
  managerid: number;
  createdAt: Date;
  manager?: User;
}
export interface CreateUserPayload {
  name: string;
  email: string;
  password:string;
  role: UserRole;
  managerid: number;
}

export interface GetUserResponse {
  count: number;
  users: User[];
}