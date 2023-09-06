"use client";

import { FC, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const CheckSaldo: FC = () => {
  const [showSaldo, setShowSaldo] = useState(false);

  return (
    <div className="absolute p-5 text-white flex flex-col space-y-4 justify-center h-full">
      <h3 className="font-medium">Saldo Anda</h3>
      <p className="text-2xl font-bold select-none">
        {showSaldo ? "Rp. 1.000.000" : <>{`Rp. ${"*".repeat(7)}`}</>}
      </p>
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
