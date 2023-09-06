"use client";

import { FC } from "react";
import { MdOutlinePayment } from "react-icons/md";

import { useForm } from "@/hooks";
import { InputText } from "@global/components/elements";

const FormPurchase: FC = () => {
  const [values, handleChange] = useForm({
    cash: 0,
  });

  return (
    <form className="flex flex-col space-y-5">
      <InputText
        required
        type="number"
        id="cash"
        name="cash"
        autoComplete="off"
        leftIcon={<MdOutlinePayment className="w-4 h-4" />}
        value={values.cash}
        onChange={handleChange}
      />
      <button
        type="submit"
        className="w-full p-2 bg-red-500 text-white font-medium rounded-md transition-all duration-300 hover:bg-red-600"
      >
        Bayar
      </button>
    </form>
  );
};

export default FormPurchase;
