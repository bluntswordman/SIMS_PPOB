import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    status: number;
    message: string;
    data: {
      token: string;
    };

    token: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    status: number;
    message: string;
    data: {
      token: string;
    };
  }
}
