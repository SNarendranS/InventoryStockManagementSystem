export interface User {
  userid: number;
  name: string;
  email: string;
  role: string;
  managerid: number;
  createdAt: Date;
  manager?: User;
}
export interface CreateUserPayload {
  name: string;
  email: string;
  role: string;
  managerid: number;
}

export interface GetUserResponse {
  count: number;
  users: User[];
}