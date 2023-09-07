import Image from "next/image";

import { BackgroundSaldo } from "@global/assets/images";
import { CheckSaldo, Profile } from "@user/_components";

export default function TransactionPage() {
  return (
    <main className="w-full min-h-screen pt-24 pb-10">
      <div className="container px-10 mx-auto flex flex-col space-y-10">
        <div className="grid-cols-5 grid gap-5 w-full">
          <div className="col-span-2">
            <Profile />
          </div>
          <div className="col-span-3 relative w-full h-40">
            <Image
              src={BackgroundSaldo}
              alt="Background Saldo"
              layout="fill"
              objectFit="cover"
              className="rounded-xl z-0"
              priority
              quality={100}
            />
            <CheckSaldo />
          </div>
        </div>
        <div className="flex flex-col space-y-7 text-gray-900">
          <h5 className="font-semibold">Semua Transaksi</h5>
          <div className="flex flex-col space-y-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="px-4 py-2 border w-full rounded-lg grid-cols-2 grid gap-1"
              >
                <div className="col-span-1 flex flex-col space-y-1.5">
                  <h6
                    className={`font-semibold inline-flex items-center ${
                      index % 2 === 0 ? "text-emerald-500" : "text-red-500"
                    }`}
                  >
                    <span className="mr-3">{index % 2 === 0 ? "+" : "-"}</span>
                    Rp. 1.000.000
                  </h6>
                  <p className="text-xs text-gray-400 flex items-center space-x-3">
                    <span>12 Agustus 2021</span>
                    <span>12:00 WIB</span>
                  </p>
                </div>
                <div className="col-span-1 flex justify-end items-start">
                  <p className="text-sm text-gray-500">
                    {index % 2 === 0 ? "Top Up" : "Transfer"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
