export interface IUser {
  email?: string;
  first_name?: string;
  last_name?: string;
  profile_image?: string | StaticImport | StaticImageData;
}

export interface IBanner {
  banner_name: string;
  banner_image: string;
  description: string;
}

export interface IService {
  service_code: string;
  service_name: string;
  service_icon: string;
  service_tariff: number;
}

export interface ITransaction extends IService {
  invoice_number: string;
  transaction_type: string;
  description: string;
  total_amount: number;
  created_on: string;
}

export interface INotification {
  message: string;
  type: "success" | "error";
}

export interface Response<T> {
  status: number;
  message: string;
  data: T | null;
}

export interface RequestAuthentication extends IUser {
  password: string;
  confirm_password?: string;
}

export interface RequestUser
  extends Pick<IUser, "email" | "first_name" | "last_name"> {}

export interface RequestUserImage extends Pick<IUser, "profile_image"> {}
