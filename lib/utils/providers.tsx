"use client";

import { ToastOptions, Toaster } from "react-hot-toast";
import AuthProvider from "./aurh-provider";
import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const toastConfig: ToastOptions = {
    position: "bottom-left",
    duration: 3000,
    style: {
      minWidth: "200px",
    },
  };

  return (
    <SessionProvider>
      <AuthProvider>
        <Toaster toastOptions={toastConfig} />
        {children}
      </AuthProvider>
    </SessionProvider>
  );
}
