"use client";

import Image from "next/image";
import { FC } from "react";
import { Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  BannerFive,
  BannerFour,
  BannerOne,
  BannerThree,
  BannerTwo,
} from "@/assets/images";

import "@user/swiper.css";
import "swiper/css";
import "swiper/css/pagination";

const BANNERS = [
  {
    image: BannerOne,
  },
  {
    image: BannerTwo,
  },
  {
    image: BannerThree,
  },
  {
    image: BannerFour,
  },
  {
    image: BannerFive,
  },
];

const ListPromo: FC = () => {
  return (
    <Swiper
      slidesPerView={4}
      spaceBetween={30}
      rewind={true}
      mousewheel={true}
      modules={[Mousewheel]}
      className="mySwiper"
    >
      {BANNERS.map((banner, index) => (
        <SwiperSlide key={index}>
          <Image
            src={banner.image}
            alt="banner"
            width={250}
            height={150}
            className="rounded-xl object-cover"
            quality={100}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ListPromo;
