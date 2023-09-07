"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";

import { Logo } from "@/assets/icons";

const Header: FC = () => {
  const pathname = usePathname();

  return (
    <header className="w-full h-16 shadow fixed bg-white z-[999]">
      <div className="container px-10 flex justify-between items-center mx-auto h-full">
        <h1 className="h-full flex items-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-lg font-bold text-gray-950"
          >
            <Image
              src={Logo}
              alt="Logo"
              width={28}
              height={28}
              className="cursor-pointer mr-2"
              priority
              quality={100}
            />
            SIMS PPOB
          </Link>
        </h1>
        <nav className="flex flex-row space-x-8 items-center">
          <Link
            href="/topup"
            className={`font-semibold transition-all duration-300 ${
              pathname.split("/")[1] === "topup"
                ? "text-red-500 hover:text-red-600"
                : "text-gray-900 hover:text-gray-800"
            }`}
          >
            Top Up
          </Link>
          <Link
            href="/transaction"
            className={`font-semibold transition-all duration-300 ${
              pathname.split("/")[1] === "transaction"
                ? "text-red-500 hover:text-red-600"
                : "text-gray-900 hover:text-gray-800"
            }`}
          >
            Transaction
          </Link>
          <Link
            href="/account"
            className={`font-semibold transition-all duration-300 ${
              pathname.split("/")[1] === "account"
                ? "text-red-500 hover:text-red-600"
                : "text-gray-900 hover:text-gray-800"
            }`}
          >
            Akun
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
