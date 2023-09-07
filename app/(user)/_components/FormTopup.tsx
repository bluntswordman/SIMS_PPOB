"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { ChangeEvent, FC, useCallback, useState } from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { MdOutlinePayment } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { Logo } from "@global/assets/icons";
import { InputGroup } from "@global/components/elements";
import { Modal } from "@global/components/fragments";
import { useForm } from "@global/hooks";
import { AppDispatch, RootState } from "@global/store";
import {
  addBalanceAccount,
  getBalanceAccount,
} from "@global/store/features/balanceSlice";
import type { INotification } from "@global/types/auth";

interface IFormTopup {
  nominal: number;
}

const NOMINALS = [10000, 20000, 50000, 100000, 250000, 500000];

const FormTopup: FC = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notification, setNotification] = useState<INotification | null>({
    message: "",
    type: "success",
  });

  const { data: session } = useSession();
  const { loading } = useSelector((state: RootState) => state.balance);
  const dispatch = useDispatch<AppDispatch>();

  const [values, handleChange] = useForm<IFormTopup>({
    nominal: 0,
  });

  const handleSubmit = useCallback(
    async (e: ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (session?.token) {
        dispatch(addBalanceAccount(values.nominal))
          .unwrap()
          .then((res) => {
            console.log(res);
            if (res.data === null) {
              setNotification({
                message: "Gagal",
                type: "error",
              });
            } else {
              setNotification({
                message: "Berhasil",
                type: "success",
              });
              dispatch(getBalanceAccount());
              setShowForm(false);
              setShowNotification(true);
            }
          });
      }
    },
    [dispatch, session?.token, values.nominal]
  );

  return (
    <div className="grid grid-cols-5 gap-5 w-full">
      <div className="col-span-3 w-full flex flex-col space-y-5 justify-between h-full">
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
          disabled={
            values.nominal < 10000 || values.nominal > 1000000 || loading
          }
          className="w-full p-2 bg-red-500 text-white font-medium rounded-md transition-all duration-300 hover:bg-red-600 disabled:bg-gray-200"
          onClick={() => setShowForm(true)}
        >
          Top Up
        </button>
      </div>
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
        isShow={showNotification}
        setIsShow={setShowNotification}
        className="w-[25%] h-fit bg-white rounded-lg py-5 px-3 flex flex-col items-center justify-center space-y-3"
      >
        {notification?.type === "error" ? (
          <AiFillCloseCircle className="w-16 h-16 text-red-500" />
        ) : (
          <AiFillCheckCircle className="w-16 h-16 text-emerald-500" />
        )}
        <div className="flex flex-col">
          <p className="text-gray-900 text-center font-medium">
            Top Up sebesar
          </p>
          <h6 className="text-gray-900 text-center font-bold text-2xl">
            {`Rp.${new Intl.NumberFormat("id-ID").format(values.nominal)}`}
          </h6>
          <p className="text-gray-900 text-center font-medium">
            {notification?.message}
          </p>
        </div>
        <button
          type="button"
          className="w-fit h-fit text-red-500 font-semibold"
          onClick={() => setShowNotification(false)}
        >
          Kembali ke beranda
        </button>
      </Modal>
      <Modal
        isShow={showForm}
        setIsShow={setShowForm}
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
            {`Rp.${new Intl.NumberFormat("id-ID").format(values.nominal)}`}
          </h6>
        </div>
        <form onSubmit={handleSubmit}>
          <button
            type="submit"
            className="w-fit h-fit text-red-500 font-semibold"
          >
            Ya, lanjutkan bayar
          </button>
        </form>
        <button
          type="button"
          className="w-fit h-fit text-gray-400 font-semibold"
          onClick={() => setShowForm(false)}
        >
          Batalkan
        </button>
      </Modal>
    </div>
  );
};

export default FormTopup;
