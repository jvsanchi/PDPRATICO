export interface IUser {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role?: any;
}
