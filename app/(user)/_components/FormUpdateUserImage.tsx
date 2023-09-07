"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { HiOutlinePencil } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";

import { ProfilePhoto } from "@global/assets/images";
import { Modal } from "@global/components/fragments";
import { Loading } from "@global/components/vectors";
import { useAxios } from "@global/libs/axios";
import { IMAGE_FORMAT } from "@global/libs/constant";
import { AppDispatch, RootState } from "@global/store";
import {
  getUserProfile,
  updateUserImageProfile,
} from "@global/store/features/userSlice";

import type { INotification } from "@global/types/auth";

const FormUpdateUserImage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [notification, setNotification] = useState<INotification | null>({
    message: "",
    type: "success",
  });

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
  }, [dispatch, axios, session?.token]);

  const handleChange = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (session?.token) {
        dispatch(updateUserImageProfile({ file: image as File }))
          .unwrap()
          .then((response) => {
            if (response.data === null) {
              setNotification({
                message: response.message,
                type: "error",
              });
            } else {
              setNotification({
                message: response.message,
                type: "success",
              });
            }
            setTimeout(() => {
              setNotification({
                message: "",
                type: "success",
              });
            }, 5000);
            dispatch(getUserProfile());
            setImage(null);
            setShowForm(false);
          });
      }
    },
    [session?.token, dispatch, image]
  );

  return (
    <>
      {notification && notification?.message.length >= 1 && (
        <div
          className={`absolute w-fit p-2 rounded-md h-fit top-20 right-5 overflow-hidden ${
            notification?.type === "success"
              ? "text-emerald-500 bg-emerald-50"
              : "text-red-500 bg-red-50"
          }`}
        >
          <p className="text-sm">{notification.message}</p>
        </div>
      )}
      <div className="flex flex-col items-center space-y-3">
        {loading || user.data?.first_name === undefined ? (
          <>
            <div className="h-[100px] w-[100px] loading-animate rounded-full"></div>
            <Loading width={30} height={30} />
          </>
        ) : (
          <>
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
                      setShowForm(true);
                    } else {
                      setNotification({
                        message: "Ukuran gambar terlalu besar",
                        type: "error",
                      });
                      setTimeout(() => {
                        setNotification({
                          message: "",
                          type: "success",
                        });
                      }, 5000);
                    }
                  }
                }}
              />
              <label htmlFor="imageUpload" className="relative">
                <Image
                  src={
                    IMAGE_FORMAT.test(user?.data?.profile_image)
                      ? user?.data?.profile_image
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
            <h2 className="font-bold text-2xl text-gray-950 text-center">
              {`${user.data?.first_name} ${user.data?.last_name}`}
            </h2>
          </>
        )}
      </div>
      {showForm && (
        <Modal
          isShow={showForm}
          setIsShow={setShowForm}
          className="w-full h-screen absolute z-[777] top-0 left-0 flex justify-center items-center bg-opacity-25 bg-gray-900"
        >
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
                onClick={() => {
                  setImage(null);
                  setShowForm(false);
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default FormUpdateUserImage;
