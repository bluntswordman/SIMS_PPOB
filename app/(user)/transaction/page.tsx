import Image from "next/image";

import { BackgroundSaldo } from "@global/assets/images";
import { Balance, HistoryTransaction, Profile } from "@user/_components";

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
            <Balance />
          </div>
        </div>
        <div className="flex flex-col space-y-7 text-gray-900">
          <h5 className="font-semibold">Semua Transaksi</h5>
          <HistoryTransaction />
        </div>
      </div>
    </main>
  );
}
