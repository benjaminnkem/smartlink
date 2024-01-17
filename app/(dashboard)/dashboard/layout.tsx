import authOptions from "@/lib/utils/auth-options";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const session = getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return <>{children}</>;
};

export default Layout;
