"use client";

import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";

interface SessionProvidersProps {
  children: ReactNode;
}

const SessionProviders: FC<SessionProvidersProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviders;
