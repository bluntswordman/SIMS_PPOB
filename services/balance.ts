import axios from "@/libs/axios";

export const getBalance = async () => {
  try {
    const res = await axios.get("/balance");
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const addBalance = async (amount: number) => {
  try {
    const res = await axios.post("/topup", {
      top_up_amount: amount,
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};
