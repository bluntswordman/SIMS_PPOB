"use client";

import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import {
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FiAtSign } from "react-icons/fi";
import { MdLockOutline } from "react-icons/md";
import { useRouter } from "next/navigation";

import { InputText } from "@global/components/elements";
import { useForm } from "@global/hooks";

interface IFormLogin {
  email: string;
  password: string;
}

interface IEyes {
  password: boolean;
}

const FormLogin = () => {
  const router = useRouter();

  const [eyes, setEyes] = useState<IEyes>({
    password: false,
  });
  const [error, setError] = useState({
    status: false,
    message: "",
  });

  const [values, handleChange] = useForm<IFormLogin>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password } = values;

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/dashboard",
    });

    if (result?.error && result.error.length >= 1) {
      setError({
        status: true,
        message: "password yang anda masukan asalah",
      });

      setTimeout(() => {
        setError({
          status: false,
          message: "",
        });
      }, 2000);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <form className="flex flex-col w-[70%] space-y-10" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <InputText
          required
          name="email"
          type="email"
          id="email"
          placeholder="masukan email anda"
          leftIcon={<FiAtSign className=" h-4 w-4" />}
          value={values.email}
          onChange={handleChange}
        />
        <InputText
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
        className="w-full py-2.5 px-2 rounded-md bg-red-500 text-white font-medium text-sm mt-7 transition-all duration-300 hover:bg-red-600"
      >
        Masuk
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

export default FormLogin;
