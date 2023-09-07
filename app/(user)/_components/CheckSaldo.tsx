"use client";

import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

import { Loading } from "@/components/vectors";
import { useAxios } from "@/libs/axios";
import { getBalanceAccount } from "@/store/features/balanceSlice";
import { AppDispatch, RootState } from "@global/store";

const CheckSaldo: FC = () => {
  const [showSaldo, setShowSaldo] = useState(false);

  const { data: session } = useSession();
  const axios = useAxios();

  const { data, loading } = useSelector((state: RootState) => state.balance);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (session?.token) {
      dispatch(getBalanceAccount());
    }
  }, [session?.token, dispatch, axios]);

  return (
    <div className="absolute p-5 text-white flex flex-col space-y-4 justify-center h-full">
      <h3 className="font-medium z-20">Saldo Anda</h3>
      {loading || data.balance === undefined ? (
        <div className="flex justify-start text-start">
          <Loading width={30} height={30} />
        </div>
      ) : (
        <p className="text-2xl font-bold select-none">
          {showSaldo ? (
            <>{`Rp. ${data.balance.toLocaleString("id-ID")}`}</>
          ) : (
            <>{`Rp. ${"*".repeat(7)}`}</>
          )}
        </p>
      )}
      <button
        type="button"
        className="inline-flex items-center cursor-pointer text-sm h-fit w-fit outline-none ring-0"
        onClick={() => setShowSaldo(!showSaldo)}
      >
        {showSaldo ? (
          <>
            Tutup Saldo
            <AiOutlineEyeInvisible className="ml-2 w-4 h-4" />
          </>
        ) : (
          <>
            Lihat Saldo
            <AiOutlineEye className="ml-2 w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );
};

export default CheckSaldo;
