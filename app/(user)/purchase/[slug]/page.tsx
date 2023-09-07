import Image from "next/image";

import { BackgroundSaldo } from "@global/assets/images";
import { CheckSaldo, FormPurchase, Profile } from "@user/_components";

interface PurchasePageProps {
  params: {
    slug: string;
  };
}

export default function PurchasePage({ params }: PurchasePageProps) {
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
            <CheckSaldo />
          </div>
        </div>
        <FormPurchase slug={params.slug} />
      </div>
    </main>
  );
}
