"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useAxios } from "@global/libs/axios";
import { AppDispatch, RootState } from "@global/store";
import { getBannersModule } from "@global/store/features/moduleSlice";

import type { IBanner } from "@global/types";

import "@user/swiper.css";
import "swiper/css";
import "swiper/css/pagination";

const ListBanner: FC = () => {
  const { data: session } = useSession();
  const axios = useAxios();
  const { banners, loading } = useSelector((state: RootState) => state.module);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (session?.token) {
      dispatch(getBannersModule());
    }
  }, [session?.token, dispatch, axios]);

  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={30}
      rewind={true}
      mousewheel={true}
      modules={[Mousewheel]}
      className="mySwiper"
    >
      {loading || !banners ? (
        <>
          {Array.from(Array(4).keys()).map((_, index) => (
            <SwiperSlide key={index}>
              <div className="h-[150px] w-full rounded-xl bg-gray-200 relative animate-pulse animate-infinite animate-duration-[800ms] animate-delay-[10ms] animate-ease-in-out animate-normal animate-fill-both"></div>
            </SwiperSlide>
          ))}
        </>
      ) : (
        <>
          {banners.map((banner: IBanner, index: number) => (
            <SwiperSlide key={index}>
              <Image
                src={banner.banner_image}
                alt="banner"
                width={250}
                height={150}
                className="rounded-xl object-cover"
                quality={100}
              />
            </SwiperSlide>
          ))}
        </>
      )}
    </Swiper>
  );
};

export default ListBanner;
