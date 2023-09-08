import Image from "next/image";

import { BackgroundSaldo } from "@global/assets/images";
import { Balance, FormTopUp, Profile } from "@user/_components";

export default function TopupPage() {
  return (
    <main className="w-full min-h-screen pt-24">
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
        <div className="flex flex-col space-y-1 text-gray-900">
          <h5 className="font-medium">Silahkan Masukan</h5>
          <h3 className="font-bold text-3xl">Nominal Top Up</h3>
        </div>
        <FormTopUp />
      </div>
    </main>
  );
}
