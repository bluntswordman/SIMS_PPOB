"use client";

import { FaRegUser } from "react-icons/fa";
import { FiAtSign } from "react-icons/fi";
import { useState } from "react";

import { InputText } from "@/components/elements";
import { useForm } from "@/hooks";

const FormAccount = () => {
  const [update, setUpdate] = useState<boolean>(false);

  const [values, handleChange] = useForm({
    email: "",
    firstName: "",
    lastName: "",
  });

  return (
    <form className="w-1/2 flex flex-col space-y-10 mb-5">
      <div className="flex flex-col space-y-5">
        <InputText
          disabled={!update}
          label="email"
          placeholder="Masukkan email"
          type="email"
          name="email"
          id="email"
          leftIcon={<FiAtSign className=" h-4 w-4" />}
          value={values.email}
          onChange={handleChange}
        />
        <InputText
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
        <InputText
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
        <button
          type="submit"
          className="py-2 px-4 rounded-md text-white font-semibold bg-red-500 transition-color duration-300 hover:bg-red-600"
        >
          Simpan
        </button>
      ) : (
        <div className="flex flex-col space-y-5">
          <button
            type="button"
            className="py-2 px-4 rounded-md text-white font-semibold bg-red-500 transition-color duration-300 hover:bg-red-600"
            onClick={() => setUpdate(true)}
          >
            Edit Profil
          </button>
          <button
            type="button"
            className="py-2 px-4 rounded-md text-red-500 font-semibold bg-white transition-color duration-300 hover:bg-red-50 border border-red-500"
          >
            Logout
          </button>
        </div>
      )}
    </form>
  );
};

export default FormAccount;
