import axios from "@global/libs/axios";

export const addTransaction = async (code: string) => {
  try {
    const res = await axios.post("/transaction", {
      service_code: code,
    });

    return res;
  } catch (error: any) {
    return error.response;
  }
};

interface IHistoryTransaction {
  offset?: number;
  limit?: number;
}

export const getHistoryTransaction = async (request: IHistoryTransaction) => {
  try {
    const response = await axios.get(
      `/transaction/history?offset=${request.offset || 0}&limit=${
        request.limit || 5
      }`
    );

    return response.data.data.records;
  } catch (error: any) {
    return error.response;
  }
};
