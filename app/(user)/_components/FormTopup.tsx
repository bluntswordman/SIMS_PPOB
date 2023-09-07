"use client";

import Image from "next/image";
import { ChangeEvent, FC, useState } from "react";
import { MdOutlinePayment } from "react-icons/md";

import { Logo } from "@/assets/icons";
import { InputGroup } from "@/components/elements";
import { Modal } from "@/components/fragments";
import { useForm } from "@/hooks";

interface IFormTopup {
  nominal: number;
}

const NOMINALS = [10000, 20000, 50000, 100000, 250000, 500000];

const FormTopup: FC = () => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const [values, handleChange] = useForm<IFormTopup>({
    nominal: 0,
  });

  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <div className="grid grid-cols-5 gap-5 w-full">
      <form
        className="col-span-3 w-full flex flex-col space-y-5 justify-between h-full"
        onSubmit={handleSubmit}
      >
        <InputGroup
          required
          name="nominal"
          type="number"
          id="nominal"
          placeholder="Masukan nominal Top Up"
          leftIcon={<MdOutlinePayment className="w-4 h-4" />}
          value={values.nominal}
          onChange={handleChange}
        />
        <button
          type="button"
          disabled={values.nominal === 0}
          className="w-full p-2 bg-red-500 text-white font-medium rounded-md transition-all duration-300 hover:bg-red-600 disabled:bg-gray-200"
          onClick={() => setIsShow(true)}
        >
          Top Up
        </button>
      </form>
      <div className="col-span-2 grid grid-cols-3 gap-3">
        {NOMINALS.map((nominal: number) => (
          <button
            key={nominal}
            type="button"
            className={`px-2 rounded-md border  transition-all duration-300 cursor-pointer ${
              values.nominal === nominal
                ? "border-red-500 text-red-500"
                : "border-gray-400 hover:border-gray-700 hover:text-gray-700"
            }`}
            onClick={() =>
              handleChange({
                target: {
                  name: "nominal",
                  value: nominal,
                },
              } as unknown as ChangeEvent<HTMLInputElement>)
            }
          >
            {`Rp.${new Intl.NumberFormat("id-ID").format(nominal)}`}
          </button>
        ))}
      </div>
      <Modal
        isShow={isShow}
        setIsShow={setIsShow}
        className="w-[25%] h-fit bg-white rounded-lg py-5 px-3 flex flex-col items-center justify-center space-y-3"
      >
        <Image
          src={Logo}
          alt="logo"
          width={55}
          height={55}
          quality={100}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <p className="text-gray-900 text-center">
            Beli listrik prabayar senilai
          </p>
          <h6 className="text-gray-900 text-center font-bold text-2xl">
            Rp10.000 ?
          </h6>
        </div>
        <button
          type="button"
          className="w-fit h-fit text-red-500 font-semibold"
        >
          Ya, lanjutkan bayar
        </button>
        <button
          type="button"
          className="w-fit h-fit text-gray-400 font-semibold"
          onClick={() => setIsShow(false)}
        >
          Batalkan
        </button>
      </Modal>
    </div>
  );
};

export default FormTopup;
