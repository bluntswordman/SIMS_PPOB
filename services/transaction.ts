import axios from "@global/libs/axios";

import type {
  ITransaction,
  RequestHistoryTransaction,
  RequestTransaction,
  Response,
} from "@global/types";

export const addTransaction = async (
  request: RequestTransaction
): Promise<Response<ITransaction>> => {
  try {
    const response = await axios.post("/transaction", {
      service_code: request.service_code,
    });

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getHistoryTransaction = async (
  request: RequestHistoryTransaction
): Promise<ITransaction[]> => {
  try {
    const response = await axios.get(
      `/transaction/history?offset=${request.offset || 0}&limit=${
        request.limit || 5
      }`
    );

    return response.data.data.records;
  } catch (error: any) {
    return [];
  }
};
