import axios from "@global/libs/axios";
import type { IBanner, IService, Response } from "@global/types";

export const getBanners = async (): Promise<Response<IBanner[]>> => {
  try {
    const response = await axios.get("/banner");

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getServices = async (): Promise<Response<IService[]>> => {
  try {
    const response = await axios.get("/services");

    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getServiceBySlug = async (
  slug: string
): Promise<IService | null> => {
  try {
    const response = await axios.get("/services");
    const find = response.data.data.find(
      (item: IService) => item.service_code === slug
    );

    return find;
  } catch (error: any) {
    return null;
  }
};
