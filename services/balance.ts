import axios from "@global/libs/axios";
import type { IBalance, RequestBalance, Response } from "@global/types";

export const getBalance = async (): Promise<Response<IBalance>> => {
  try {
    const response = await axios.get("/balance");

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const addBalance = async (
  request: RequestBalance
): Promise<Response<IBalance>> => {
  try {
    const response = await axios.post("/topup", {
      top_up_amount: request.top_up_amount,
    });

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
