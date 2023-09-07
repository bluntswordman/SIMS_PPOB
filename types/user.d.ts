export interface IUser {
  email?: string;
  first_name: string;
  last_name: string;
  profile_image?: string | StaticImport | StaticImageData;
}

export interface UserResponse {
  status: number;
  message: string;
  data: IUser | null;
}

export interface UserRequest {
  email?: string;
  last_name: string;
  first_name: string;
}

export interface UserImageRequest {
  file: File | null;
}
