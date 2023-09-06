import Image from "next/image";
import { HiOutlinePencil } from "react-icons/hi";

import { ProfilePhoto } from "@/assets/images";
import { FormAccount } from "@user/_components";

export default function AccountPage() {
  return (
    <main className="w-full min-h-screen pt-24">
      <div className="container px-10 mx-auto flex flex-col items-center space-y-8 w-full h-full">
        <div className="relative w-fit h-fit rounded-full border">
          <Image
            src={ProfilePhoto}
            alt="background saldo"
            width={100}
            height={100}
            quality={100}
            className="rounded-xl"
          />
          <button
            type="button"
            className="absolute h-7 w-7 border-2 bottom-0 -right-2 flex items-center justify-center rounded-full text-gray-800 border-gray-400 outline-none ring-0 bg-white transition-colors duration-200 hover:bg-gray-100"
          >
            <HiOutlinePencil className="w-4 h-4" />
          </button>
        </div>
        <h2 className="font-bold text-2xl text-gray-950">Kristanto Wibowo</h2>
        <FormAccount />
      </div>
    </main>
  );
}
