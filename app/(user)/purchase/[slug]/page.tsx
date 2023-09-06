import Image from "next/image";

import { BackgroundSaldo, ProfilePhoto } from "@global/assets/images";
import { CheckSaldo, FormPurchase } from "@user/_components";
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

interface PurchasePageProps {
  params: {
    slug: string;
  };
}

export default function PurchasePage({ params }: PurchasePageProps) {
  console.log(params.slug);

  return (
    <main className="w-full min-h-screen pt-24">
      <div className="container px-10 mx-auto flex flex-col space-y-10">
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
            <div className="flex flex-col space-y-0 text-gray-900">
              <p className="font-medium">Selamat datang,</p>
              <h3 className="font-bold text-3xl">Kristanto Wibowo</h3>
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
        <div className="flex flex-col space-y-1 text-gray-900">
          <h5 className="font-medium">Pembayaran</h5>
          <div className="flex items-center space-x-2">
            <Image
              src={Listrik}
              alt="Listrik"
              width={32}
              height={32}
              className="rounded-lg"
              priority
              quality={100}
            />
            <h5 className="capitalize font-semibold">{params.slug}</h5>
          </div>
        </div>
        <FormPurchase />
      </div>
    </main>
  );
}
