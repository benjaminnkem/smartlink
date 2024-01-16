import type { AuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import axios from "axios";
import { User } from "../types/user";

const authOptions: AuthOptions = {
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await axios.post<User>("/api/auth/login", credentials);

        if (user.status === 401) return null;
        const { data } = user;
        console.log(data);

        const { password, ...remaining } = data;

        return remaining;
      },
    }),
  ],
};

export default authOptions;
