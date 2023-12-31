"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FiAtSign } from "react-icons/fi";
import { MdLockOutline } from "react-icons/md";

import { InputGroup } from "@global/components/elements";
import { useForm } from "@global/hooks";

import type { INotification, RequestAuthentication } from "@global/types";

const FormLogin = () => {
  const router = useRouter();

  const [eyes, setEyes] = useState({
    password: false,
  });

  const [notification, setNotification] = useState<INotification>({
    type: "success",
    message: "",
  });

  const [values, handleChange] = useForm<RequestAuthentication>({
    email: "",
    password: "",
  });

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      const { email, password } = values;

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error && result.error.length >= 1) {
        setNotification({
          type: "error",
          message: "password yang anda masukan asalah",
        });
      } else {
        setNotification({
          type: "success",
          message: "berhasil masuk",
        });
        router.push("/dashboard");
      }

      setTimeout(() => {
        setNotification({
          type: "success",
          message: "",
        });
      }, 3000);
    },
    [router, values]
  );

  return (
    <form className="flex flex-col w-[70%] space-y-10" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <InputGroup
          required
          name="email"
          type="email"
          id="email"
          placeholder="masukan email anda"
          leftIcon={<FiAtSign className=" h-4 w-4" />}
          value={values.email}
          onChange={handleChange}
        />
        <InputGroup
          required
          autoComplete="off"
          type={eyes.password ? "text" : "password"}
          name="password"
          id="password"
          placeholder="buat password"
          leftIcon={<MdLockOutline className=" h-4 w-4" />}
          rightIcon={
            eyes.password ? (
              <AiOutlineEyeInvisible
                className="h-5 w-5 cursor-pointer"
                onClick={() =>
                  setEyes((prev) => ({ ...prev, password: !prev.password }))
                }
              />
            ) : (
              <AiOutlineEye
                className="h-5 w-5 cursor-pointer"
                onClick={() =>
                  setEyes((prev) => ({ ...prev, password: !prev.password }))
                }
              />
            )
          }
          value={values.password}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        disabled={
          (values.password ? values.password.length < 8 : false) ||
          (values.email ? values.email.length < 5 : false)
        }
        className="btn-solid-primary"
      >
        Masuk
      </button>
      {notification.message.length >= 1 && (
        <div className="absolute bottom-4 left-0 w-full h-fit px-4">
          <div
            className={`flex justify-between items-center px-1.5 py-1 rounded-md ${
              notification.type === "success"
                ? "bg-emerald-50 text-emerald-500"
                : "bg-red-50 text-red-500"
            }`}
          >
            <p className="text-sm">{notification.message}</p>
            <button type="button">
              <AiOutlineClose className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default FormLogin;
