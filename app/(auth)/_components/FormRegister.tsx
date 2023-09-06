"use client";

import { FormEvent, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa";
import { FiAtSign } from "react-icons/fi";
import { MdLockOutline } from "react-icons/md";

import { InputText } from "@global/components/elements";
import { useForm } from "@global/hooks";

interface IFormRegister {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

interface IEyes {
  password: boolean;
  confirmPassword: boolean;
}

const FormRegister = () => {
  const [eyes, setEyes] = useState<IEyes>({
    password: false,
    confirmPassword: false,
  });

  const [values, handleChange] = useForm<IFormRegister>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);
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
          type="text"
          name="firstName"
          id="firstName"
          placeholder="nama depan"
          leftIcon={<FaRegUser className=" h-4 w-4" />}
          value={values.firstName}
          onChange={handleChange}
        />
        <InputText
          required
          type="text"
          name="lastName"
          id="lastName"
          placeholder="nama belakang"
          leftIcon={<FaRegUser className=" h-4 w-4" />}
          value={values.lastName}
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
        <InputText
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
      <button type="submit" className="wrapper__button">
        Registrasi
      </button>
    </form>
  );
};

export default FormRegister;
