import axios from "@/libs/axios";

import type { RequestAuthentication, Response } from "@global/types";

export const register = async (
  request: RequestAuthentication
): Promise<Response<null>> => {
  try {
    const response = await axios.post("/registration", {
      email: request.email,
      first_name: request.first_name,
      last_name: request.last_name,
      password: request.password,
    });

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
