import NextAuth from "next-auth/next";

import { authOptions } from "@global/libs/auth";

const handler = NextAuth(authOptions);
export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as DELETE,
  handler as PATCH,
  handler as OPTIONS,
};
