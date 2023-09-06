import Image from "next/image";
import Link from "next/link";

import { FormLogin } from "@auth/_components";
import { Logo } from "@global/assets/icons";
import { LoginIllustration } from "@global/assets/images";

export default function LoginPage() {
  return (
    <main className="w-full h-screen lg:overflow-hidden grid grid-cols-2">
      <div className="col-span-1 flex flex-col justify-center items-center space-y-8 relative">
        <h2 className="inline-flex items-center text-gray-950 font-bold text-xl">
          <Image
            src={Logo}
            alt="Logo"
            width={32}
            height={32}
            className="mr-2"
            priority
          />
          SIMS PPOB
        </h2>
        <p className="font-bold text-3xl px-24 lg:px-44 text-center">
          Masuk atau buat akun untuk memulai
        </p>
        <FormLogin />
        <p className="text-gray-950 text-sm">
          belum punya akun? registrasi{" "}
          <Link
            href="register"
            className="text-red-500 font-semibold transition-all duration-300 hover:text-red-600"
          >
            disini
          </Link>
        </p>
      </div>
      <div className="col-span-1 relative w-full h-full flex">
        <Image
          src={LoginIllustration}
          alt="Login Illustration"
          layout="fill"
          className="absolute object-cover object-center z-0"
          priority
          quality={100}
        />
      </div>
    </main>
  );
}
