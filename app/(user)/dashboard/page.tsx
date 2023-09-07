import Image from "next/image";

import { BackgroundSaldo } from "@/assets/images";
import { Banner, CheckSaldo, ListService, Profile } from "@user/_components";

export default function DashboardPage() {
  return (
    <main className="w-full min-h-screen pt-24 pb-10">
      <div className="container px-10 mx-auto">
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
        <div className="grid grid-cols-12 gap-3 w-full my-10">
          <ListService />
        </div>
      </div>
      <div className="flex flex-col space-y-5 items-start">
        <div className="px-10 container mx-auto ">
          <h2 className="font-bold">Temukan promo menarik</h2>
        </div>
        <Banner />
      </div>
    </main>
  );
}