import type { AuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { User } from "../types/user";
import { publicApi } from "../configs/axiosInstance";

const authOptions: AuthOptions = {
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await publicApi.post<User>("/api/auth/login", credentials);

          if (user.status === 401) return null;
          const { data } = user;

          const { password, ...remaining } = data;

          return remaining;
        } catch (e) {
          console.log(e);
          return null;
        }
      },
    }),
  ],
  pages: {
    signOut: "/",
    signIn: "/dashboard",
    error: "/",
  },
};

export default authOptions;
