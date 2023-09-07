import axios from "@/libs/axios";
import type { AuthRequest, AuthResponse } from "@/types/auth";

export const register = async (request: AuthRequest): Promise<AuthResponse> => {
  try {
    const response = await axios.post("/registration", {
      email: request.email,
      first_name: request.first_name,
      last_name: request.last_name,
      password: request.password,
    });

    return response.data;
  } catch (error: any) {
    throw new Error(error?.response.data.message);
  }
};
