import axios from "@global/libs/axios";
import { IService } from "@/types/module";

export const getBanners = async () => {
  try {
    const res = await axios.get("/banner");
    // console.log(res.data);

    return res.data;
  } catch (error: any) {
    // console.log(error.response.data);

    return error.response.data;
  }
};

export const getServices = async () => {
  try {
    const res = await axios.get("/services");

    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const getServicesBySlug = async (slug: string) => {
  try {
    const res = await axios.get("/services");
    const find = res.data.data.find(
      (item: IService) => item.service_code === slug
    );

    return find;
  } catch (error: any) {
    return error.response.data;
  }
};
