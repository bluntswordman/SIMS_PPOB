export interface IFormRegister {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

export interface IFormLogin {
  email: string;
  password: string;
}

export interface IError {
  status: boolean;
  message: string;
}

export interface INotification {
  message: string;
  type: "success" | "error";
}
