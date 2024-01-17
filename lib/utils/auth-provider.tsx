"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { opacityVariant } from "./variants";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          {...opacityVariant}
          key="loader"
          className="fixed top-0 left-0 w-full min-h-screen flex items-center justify-center"
        >
          <div className="text-center animate-pulse">
            <p className="text-6xl font-extrabold">
              Smart<span className="text-cyan-300">link</span>
            </p>
            <p className="font-semibold opacity-50">by Tochi</p>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;
