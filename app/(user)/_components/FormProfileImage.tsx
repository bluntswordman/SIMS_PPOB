"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { HiOutlinePencil } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";

import { ProfilePhoto } from "@/assets/images";
import { useAxios } from "@global/libs/axios";
import { IMAGE_FORMAT } from "@global/libs/constant";
import { AppDispatch, RootState } from "@global/store";
import {
  getUserProfile,
  updateUserProfileImage,
} from "@global/store/features/userSlice";

const FormProfileImage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [update, setUpdate] = useState<boolean>(false);

  const { data: session } = useSession();
  const axios = useAxios();
  const { data, loading } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (session?.token) {
      dispatch(getUserProfile());
    }
  }, [dispatch, axios, session?.token]);

  const handleChange = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (session?.token) {
        dispatch(updateUserProfileImage(image))
          .unwrap()
          .then(() => {
            dispatch(getUserProfile());
            setImage(null);
            setUpdate(false);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    [dispatch, session?.token, image]
  );

  return (
    <>
      <div className="flex flex-col items-center space-y-3">
        <div className="relative w-fit h-fit rounded-full border">
          <input
            type="file"
            id="imageUpload"
            hidden
            accept="image/jpeg, image/png"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                if (e.target.files[0].size <= 100 * 1024) {
                  setImage(e.target.files[0]);
                  setUpdate(true);
                } else {
                  alert("Ukuran file harus kurang dari atau sama dengan 100KB");
                }
              }
            }}
          />
          <label htmlFor="imageUpload" className="relative">
            <Image
              src={
                IMAGE_FORMAT.test(data?.profile_image)
                  ? data?.profile_image
                  : ProfilePhoto
              }
              alt="background saldo"
              width={100}
              height={100}
              quality={100}
              className="rounded-full"
            />
            <span className="absolute h-7 w-7 border-2 bottom-0 -right-2 flex items-center justify-center rounded-full text-gray-800 border-gray-400 outline-none ring-0 bg-white transition-colors duration-200 hover:bg-gray-100 cursor-pointer">
              <HiOutlinePencil className="w-4 h-4" />
            </span>
          </label>
        </div>
        {loading || data?.first_name === undefined ? (
          <p className="font-bold text-2xl">Loading...</p>
        ) : (
          <h2 className="font-bold text-2xl text-gray-950 text-center">
            {`${data?.first_name} ${data?.last_name}`}
          </h2>
        )}
      </div>
      {update && (
        <div className="w-full h-screen absolute z-[999] top-0 left-0 flex justify-center items-center bg-opacity-25 bg-gray-900">
          <div className="w-1/2 h-fit p-5 bg-white rounded-md flex flex-col items-center border relative space-y-10">
            <Image
              src={image ? URL.createObjectURL(image) : ProfilePhoto}
              alt="background saldo"
              width={250}
              height={250}
              quality={100}
              className="rounded-xl relative"
            />
            <p className="text-center text-gray-950 font-bold text-2xl">
              Apakah anda yakin ingin mengubah foto profil?
            </p>
            <form
              className="w-full flex flex-col space-y-5"
              onSubmit={handleChange}
            >
              <button type="submit" className="btn-solid-primary">
                Save
              </button>
              <button
                type="button"
                className="btn-outline-primary"
                onClick={() => setUpdate(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FormProfileImage;
