import axios from "axios";
import { useSession } from "next-auth/react";

import { API_URL } from "./constant";

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  },
});

export const setAuthToken = (token: string) => {
  if (token) {
    instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common["Authorization"];
  }
};

export default instance;

export const useAxios = () => {
  const { data: session } = useSession();
  if (session) setAuthToken(session.token);

  return instance;
};
