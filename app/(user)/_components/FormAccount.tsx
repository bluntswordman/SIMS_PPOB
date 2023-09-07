"use client";

import { signOut, useSession } from "next-auth/react";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { FaRegUser } from "react-icons/fa";
import { FiAtSign } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import { InputGroup } from "@/components/elements";
import { useForm } from "@/hooks";
import type { INotification } from "@/types/auth";
import type { IUserProfile } from "@/types/user";
import { useAxios } from "@global/libs/axios";
import { AppDispatch, RootState } from "@global/store";
import {
  getUserProfile,
  updateUserProfile,
} from "@global/store/features/userSlice";

const FormAccount = () => {
  const [update, setUpdate] = useState<boolean>(false);
  const [notification, setNotification] = useState<INotification | null>({
    message: "",
    type: "success",
  });

  const { data: session } = useSession();
  const axios = useAxios();
  const { data } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const [values, handleChange] = useForm<IUserProfile>({
    email: "",
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    if (session?.token) {
      dispatch(getUserProfile());
    }
  }, [dispatch, axios, session?.token]);

  useEffect(() => {
    if (data) {
      handleChange({
        target: {
          name: "email",
          value: data.email,
        },
      } as unknown as ChangeEvent<HTMLInputElement>);
      handleChange({
        target: {
          name: "firstName",
          value: data.first_name,
        },
      } as unknown as ChangeEvent<HTMLInputElement>);
      handleChange({
        target: {
          name: "lastName",
          value: data.last_name,
        },
      } as unknown as ChangeEvent<HTMLInputElement>);
    }
  }, [data, handleChange]);

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (session?.token) {
        dispatch(updateUserProfile(values))
          .unwrap()
          .then((data) => {
            setUpdate(false);
            if (data.status >= 1) {
              setNotification({
                message: data.message,
                type: "error",
              });
            } else {
              setNotification({
                message: "Data berhasil diupdate",
                type: "success",
              });
            }
            setTimeout(() => {
              setNotification({
                message: "",
                type: "success",
              });
            }, 5000);
          });
      }
    },
    [dispatch, session?.token, values]
  );

  return (
    <>
      {notification && notification?.message.length >= 1 && (
        <div
          className={`absolute w-fit p-2 rounded-md h-fit top-10 right-5 overflow-hidden ${
            notification?.type === "success"
              ? "text-emerald-500 bg-emerald-50"
              : "text-red-500 bg-red-50"
          }`}
        >
          <p className="text-sm">{notification.message}</p>
        </div>
      )}
      <form
        className="w-1/2 flex flex-col space-y-10 mb-5"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col space-y-5">
          <InputGroup
            disabled={true}
            label="email"
            placeholder="Masukkan email"
            type="email"
            name="email"
            id="email"
            leftIcon={<FiAtSign className=" h-4 w-4" />}
            value={values.email}
          />
          <InputGroup
            disabled={!update}
            label="nama depan"
            placeholder="Masukkan Nama Depan"
            type="text"
            name="firstName"
            id="firstName"
            leftIcon={<FaRegUser className=" h-4 w-4" />}
            value={values.firstName}
            onChange={handleChange}
          />
          <InputGroup
            disabled={!update}
            label="nama belakang"
            placeholder="Masukkan Nama Belakang"
            type="text"
            name="lastName"
            id="lastName"
            leftIcon={<FaRegUser className=" h-4 w-4" />}
            value={values.lastName}
            onChange={handleChange}
          />
        </div>
        {update ? (
          <button type="submit" className="btn-solid-primary">
            Simpan
          </button>
        ) : (
          <div className="flex flex-col space-y-5">
            <button
              type="button"
              className="btn-solid-primary"
              onClick={() => setUpdate(true)}
            >
              Edit Profil
            </button>
            <button
              type="button"
              className="btn-outline-primary"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </div>
        )}
      </form>
    </>
  );
};

export default FormAccount;
