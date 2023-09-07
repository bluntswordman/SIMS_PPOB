export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard",
    "/account",
    "/purchase/:path*",
    "/topup",
    "/transaction",
  ],
};
