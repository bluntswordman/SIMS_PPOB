"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useAxios } from "@/libs/axios";
import { getServicesModule } from "@/store/features/moduleSlice";
import type { IService } from "@/types/module";
import { AppDispatch, RootState } from "@global/store";

const ListService: FC = () => {
  const { data: session } = useSession();
  const axios = useAxios();
  const { services, loading } = useSelector((state: RootState) => state.module);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (session?.token) {
      dispatch(getServicesModule());
    }
  }, [session?.token, dispatch, axios]);

  return (
    <>
      {loading || !services ? (
        <>
          {Array.from(Array(12).keys()).map((_, index) => (
            <div
              key={index}
              className="col-span-1 flex flex-col space-y-2 items-center"
            >
              <div className="h-[70px] w-[70px] rounded-lg bg-gray-200 relative animate-pulse animate-infinite animate-duration-[800ms] animate-delay-[10ms] animate-ease-in-out animate-normal animate-fill-both"></div>
            </div>
          ))}
        </>
      ) : (
        <>
          {services.map((service: IService, index: number) => (
            <Link
              key={index}
              target="_blank"
              href={`/purchase/${service.service_code}`}
              className="col-span-1 flex flex-col space-y-2 items-center"
            >
              <Image
                src={service.service_icon}
                alt={service.service_name}
                width={70}
                height={70}
                priority
                quality={100}
                className="rounded-lg opacity-75 hover:opacity-100 transition-opacity duration-300 ease-in-out"
              />
              <p className="text-center font-medium text-sm">
                {service.service_name}
              </p>
            </Link>
          ))}
        </>
      )}
    </>
  );
};

export default ListService;
