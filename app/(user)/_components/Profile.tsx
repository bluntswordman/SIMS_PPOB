"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ProfilePhoto } from "@/assets/images";
import { useAxios } from "@global/libs/axios";
import { IMAGE_FORMAT } from "@global/libs/constant";
import { AppDispatch, RootState } from "@global/store";
import { getUserProfile } from "@global/store/features/userSlice";

const Profile = () => {
  const { data: session } = useSession();
  const axios = useAxios();

  const { user, loading, error } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (session?.token) {
      dispatch(getUserProfile());
    }
  }, [session?.token, dispatch, axios]);

  return (
    <div className="h-full flex flex-col justify-between space-y-3">
      {loading || user.data?.profile_image === undefined ? (
        <div className="h-[100px] w-[100px] bg-gray-200 rounded-full loading-animate"></div>
      ) : (
        <Image
          src={
            IMAGE_FORMAT.test(user.data?.profile_image)
              ? user.data?.profile_image
              : ProfilePhoto
          }
          alt="Profile Photo"
          width={75}
          height={75}
          className="rounded-full"
          priority
          quality={100}
        />
      )}
      <div className="flex flex-col space-y-0">
        <p className="font-light text-base">Selamat datang,</p>
        {loading || user.data?.first_name === undefined ? (
          <div className="w-full h-8 rounded-lg loading-animate"></div>
        ) : (
          <h2 className="font-bold text-3xl">{`${user.data?.first_name} ${user.data?.last_name}`}</h2>
        )}
      </div>
    </div>
  );
};

export default Profile;
