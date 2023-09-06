import Image from "next/image";
// import { getServerSession } from "next-auth";

import { CheckSaldo, LIstPromo } from "@/app/(user)/_components";
import {
  Game,
  Kurban,
  Listrik,
  Musik,
  PBB,
  PDAM,
  PGN,
  PaketData,
  Pulsa,
  Televisi,
  VoucherMakan,
  Zakat,
} from "@/assets/icons";
import { BackgroundSaldo, ProfilePhoto } from "@/assets/images";

// import { authOptions } from "@global/app/api/auth/[...nextauth]/route";

import { getServerSession } from "next-auth/next"
import type { NextRequest } from "next/server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const FEATURES = [
  {
    title: "PBB",
    icon: PBB,
  },
  {
    title: "Listrik",
    icon: Listrik,
  },
  {
    title: "Pulsa",
    icon: Pulsa,
  },
  {
    title: "PDAM",
    icon: PDAM,
  },
  {
    title: "PGN",
    icon: PGN,
  },
  {
    title: "TV Langganan",
    icon: Televisi,
  },
  {
    title: "Musik",
    icon: Musik,
  },
  {
    title: "Voucher Game",
    icon: Game,
  },
  {
    title: "Voucher Makan",
    icon: VoucherMakan,
  },
  {
    title: "Kurban",
    icon: Kurban,
  },
  {
    title: "Zakat",
    icon: Zakat,
  },
  {
    title: "Paket Data",
    icon: PaketData,
  },
];

export default async function Protected (req: NextRequest): Promise<any> {
  const session = await getServerSession(authOptions)

  console.log(session)

  return (
    <main className="w-full min-h-screen pt-24">
      <div className="container px-10 mx-auto">
        <div className="grid-cols-5 grid gap-5 w-full">
          <div className="col-span-2 h-full flex flex-col justify-between space-y-3">
            <Image
              src={ProfilePhoto}
              alt="Profile Photo"
              width={75}
              height={75}
              className="rounded-full"
              priority
              quality={100}
            />
            <div className="flex flex-col space-y-0">
              <p className="font-light text-base">Selamat datang,</p>
              <h2 className="font-bold text-3xl">Kristanto Wibowo</h2>
            </div>
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
          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="col-span-1 flex flex-col space-y-2 items-center"
            >
              <Image
                src={feature.icon}
                alt={feature.title}
                width={70}
                height={70}
                priority
                quality={100}
                className="rounded-lg"
              />
              <p className="text-center font-medium text-sm">{feature.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col space-y-5 items-start">
        <div className="px-10 container mx-auto ">
          <h2 className="font-bold">Temukan promo menarik</h2>
        </div>
        <LIstPromo />
      </div>
    </main>
  );
};

// export default HomePage;
