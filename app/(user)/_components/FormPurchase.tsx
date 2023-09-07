"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { ChangeEvent, FC, useCallback, useEffect, useState } from "react";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { MdOutlinePayment } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import { Logo } from "@/assets/icons";
import { InputGroup } from "@global/components/elements";
import { Modal } from "@global/components/fragments";
import { useForm } from "@global/hooks";
import { useAxios } from "@global/libs/axios";
import { AppDispatch, RootState } from "@global/store";
import { getBalanceAccount } from "@global/store/features/balanceSlice";
import { getServicesBySlugModule } from "@global/store/features/moduleSlice";
import { addTransactionModule } from "@global/store/features/transactionSlice";
import type { INotification } from "@global/types/auth";

interface FormPurchaseProps {
  slug: string;
}

const FormPurchase: FC<FormPurchaseProps> = ({ slug }) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notification, setNotification] = useState<INotification | null>({
    message: "",
    type: "success",
  });

  const [values, handleChange] = useForm({
    cash: 0,
  });

  const { data: session } = useSession();
  const axios = useAxios();
  const { service, loading } = useSelector((state: RootState) => state.module);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (session?.token) {
      dispatch(getServicesBySlugModule(slug));
    }
  }, [session?.token, dispatch, axios, slug]);

  useEffect(() => {
    if (service) {
      handleChange({
        target: {
          name: "cash",
          value: service.service_tariff,
        },
      } as unknown as ChangeEvent<HTMLInputElement>);
    }
  }, [handleChange, service]);

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (session?.token && service) {
        dispatch(addTransactionModule(service.service_code))
          .unwrap()
          .then((res) => {
            console.log(res);
            if (res.data) {
              dispatch(getBalanceAccount());
              setShowForm(false);
              setShowNotification(true);
              setNotification({
                message: "Berhasil",
                type: "success",
              });
            } else {
              setNotification({
                message: "Gagal",
                type: "error",
              });
            }
          });
      }
    },
    [dispatch, service, session?.token]
  );

  console.log(loading);
  console.log(service?.service_icon);
  console.log(loading || service?.service_icon === undefined);

  return (
    <>
      <div className="flex flex-col space-y-1 text-gray-900">
        <h5 className="font-medium">Pembayaran</h5>
        <div className="flex items-center space-x-2">
          {loading || service?.service_icon === undefined ? (
            <>
              <div className="w-10 h-10 rounded-lg bg-gray-200 animate-pulse animate-infinite animate-duration-[800ms] animate-delay-[10ms] animate-ease-in-out animate-normal animate-fill-both"></div>
              <div className="w-52 h-8 rounded-lg bg-gray-200 animate-pulse animate-infinite animate-duration-[800ms] animate-delay-[10ms] animate-ease-in-out animate-normal animate-fill-both"></div>
            </>
          ) : (
            <>
              <Image
                src={service.service_icon}
                alt="Listrik"
                width={32}
                height={32}
                className="rounded-lg"
                priority
                quality={100}
              />
              <h5 className="capitalize font-semibold">
                {service.service_name}
              </h5>
            </>
          )}
        </div>
      </div>
      <div className="flex flex-col space-y-5">
        <InputGroup
          required
          disabled={loading || values.cash === 0}
          type="number"
          id="cash"
          name="cash"
          autoComplete="off"
          leftIcon={<MdOutlinePayment className="w-4 h-4" />}
          value={values.cash}
          onChange={handleChange}
        />
        <button
          type="button"
          disabled={loading || values.cash === 0}
          onClick={() => setShowForm(true)}
          className="btn-solid-primary"
        >
          Bayar
        </button>
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
            {`Pembayaran ${service?.service_name} sebesar`}
          </p>
          <h6 className="text-gray-900 text-center font-bold text-2xl">
            {`Rp.${new Intl.NumberFormat("id-ID").format(values.cash)}`}
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
        className="w-[25%] h-fit bg-white rounded-lg py-5 px-3 flex flex-col items-center justify-center space-y-4"
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
          <p className="text-gray-900 text-center font-medium">
            {`Bayar ${service?.service_name} sebesar`}
          </p>
          <h6 className="text-gray-900 text-center font-bold text-2xl">
            {`Rp.${new Intl.NumberFormat("id-ID").format(values.cash)}`}
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
    </>
  );
};

export default FormPurchase;
