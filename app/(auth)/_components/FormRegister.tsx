"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FC, FormEvent, useCallback, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { FiAtSign } from "react-icons/fi";
import { MdLockOutline } from "react-icons/md";

import { InputGroup } from "@global/components/elements";
import { useForm } from "@global/hooks";
import { register } from "@global/services/auth";

import type { INotification, RequestAuthentication } from "@global/types";

const FormRegister: FC = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [eyes, setEyes] = useState({
    password: false,
    confirmPassword: false,
  });

  const [notification, setNotification] = useState<INotification>({
    type: "success",
    message: "",
  });

  const [values, handleChange] = useForm<RequestAuthentication>({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirm_password: "",
  });

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      setNotification({
        type: "success",
        message: "berhasil registrasi",
      });
      router.push("/login");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      setNotification({
        type: "error",
        message: error.message,
      });

      setTimeout(() => {
        setNotification({
          type: "success",
          message: "",
        });
      }, 3000);
    },
  });

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      mutation.mutate(values);
    },
    [mutation, values]
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
          type="text"
          name="first_name"
          id="first_name"
          placeholder="nama depan"
          leftIcon={<FaRegUser className=" h-4 w-4" />}
          value={values.first_name}
          onChange={handleChange}
        />
        <InputGroup
          required
          type="text"
          name="last_name"
          id="last_name"
          placeholder="nama belakang"
          leftIcon={<FaRegUser className=" h-4 w-4" />}
          value={values.last_name}
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
        <InputGroup
          required
          autoComplete="off"
          type={eyes.confirmPassword ? "text" : "password"}
          name="confirm_password"
          id="confirm_password"
          placeholder="konfirmasi password"
          isValidate={values.password === values.confirm_password}
          message="password tidak sama"
          leftIcon={<MdLockOutline className=" h-4 w-4" />}
          rightIcon={
            eyes.confirmPassword ? (
              <AiOutlineEyeInvisible
                className="h-5 w-5 cursor-pointer"
                onClick={() =>
                  setEyes((prev) => ({
                    ...prev,
                    confirmPassword: !prev.confirmPassword,
                  }))
                }
              />
            ) : (
              <AiOutlineEye
                className="h-5 w-5 cursor-pointer"
                onClick={() =>
                  setEyes((prev) => ({
                    ...prev,
                    confirmPassword: !prev.confirmPassword,
                  }))
                }
              />
            )
          }
          value={values.confirm_password}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        disabled={
          (values.email ? !values.email.includes("@") : true) ||
          (values.last_name ? values.last_name.length < 1 : true) ||
          (values.first_name ? values.first_name.length < 1 : true) ||
          values.password.length < 1 ||
          (values.confirm_password ? values.confirm_password.length < 1 : true)
        }
        className="btn-solid-primary"
      >
        Registrasi
      </button>
      {notification.message.length >= 1 && (
        <div className="absolute bottom-4 left-0 w-full h-fit px-4">
          <div
            className={`flex justify-between  items-center px-1.5 py-1 rounded-md ${
              notification.type === "success"
                ? "bg-emerald-50 text-emerald-500"
                : "bg-red-50 text-red-500"
            }`}
          >
            <p className="text-sm">{notification.message}</p>
            <button type="button" className="">
              <AiOutlineClose className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default FormRegister;
