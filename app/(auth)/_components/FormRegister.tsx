"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useCallback, useState, FC } from "react";
import { useRouter } from "next/navigation";
import {
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { FiAtSign } from "react-icons/fi";
import { MdLockOutline } from "react-icons/md";

import type { IError, IFormRegister } from "@/types/auth";
import { InputGroup } from "@global/components/elements";
import { useForm } from "@global/hooks";
import { register } from "@global/services/auth";

const FormRegister: FC = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const [eyes, setEyes] = useState({
    password: false,
    confirmPassword: false,
  });

  const [error, setError] = useState<IError>({
    status: false,
    message: "",
  });

  const [values, handleChange] = useForm<IFormRegister>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/login");
    },
    onError: (error) => {
      setError({
        status: true,
        message: error.message,
      });

      setTimeout(() => {
        setError({
          status: false,
          message: "",
        });
      }, 3000);
    },
  });

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
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
          name="firstName"
          id="firstName"
          placeholder="nama depan"
          leftIcon={<FaRegUser className=" h-4 w-4" />}
          value={values.firstName}
          onChange={handleChange}
        />
        <InputGroup
          required
          type="text"
          name="lastName"
          id="lastName"
          placeholder="nama belakang"
          leftIcon={<FaRegUser className=" h-4 w-4" />}
          value={values.lastName}
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
          name="confirmPassword"
          id="confirmPassword"
          placeholder="konfirmasi password"
          isValidate={values.password === values.confirmPassword}
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
          value={values.confirmPassword}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        disabled={
          values.email.length < 1 ||
          values.firstName.length < 1 ||
          values.lastName.length < 1 ||
          values.password.length < 1 ||
          values.confirmPassword.length < 1
        }
        className="btn-solid-primary"
      >
        Registrasi
      </button>
      {error.status && error.message.length >= 1 && (
        <div className="absolute bottom-4 left-0 w-full h-fit px-4">
          <div className="flex justify-between bg-red-50 items-center px-1.5 py-1 text-red-500 rounded-md">
            <p className="text-sm">{error.message}</p>
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
