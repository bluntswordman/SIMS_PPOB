export interface IFormRegister {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export interface INotification {
  message: string;
  type: "success" | "error";
}

export interface AuthRequest {
  email: string;
  first_name?: string;
  last_name?: string;
  password: string;
  confirm_password?: string;
}

export interface AuthResponse {
  status: number;
  message: string;
  data: null;
}
