"use client";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { opacityVariant } from "@/lib/utils/variants";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface Inputs {
  name: string;
  email: string;
  password: string;
  // confirmPassword: string;
  // phoneNumber: string;
}

interface LoginInput {
  email: string;
  password: string;
}

const CreateAnAccount = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const { register: registerLogin, handleSubmit: handleSubmitLogin } = useForm<LoginInput>();

  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setLoading(true);

      await axios.post("/api/auth/register", data);
      toast.success("account created", { id: "success" });

      setCompleted(true);
    } catch {
      toast.error("an error occurred", { id: "error" });
    } finally {
      setLoading(false);
    }
  };

  const onLogin: SubmitHandler<LoginInput> = async (data) => {
    try {
      setLoading(true);

      const res = await signIn("credentials", { ...data, redirect: false });

      if (!res?.ok) {
        toast.error("login failed", { id: "error" });
        return;
      }

      toast.success("login successful", { id: "success" });
      router.push("/dashboard");

      setCompleted(true);
    } catch {
      toast.error("login failed", { id: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container pt-10">
      <AnimatePresence mode="wait">
        {!completed ? (
          <>
            <motion.div {...opacityVariant} key={"register"}>
              <h2 className="text-center font-extrabold text-3xl opacity-80">Create An Account</h2>
              <motion.form
                {...opacityVariant}
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="max-w-4xl mx-auto mt-5 flex items-center justify-center"
              >
                <div>
                  <div className="space-y-3 p-2">
                    <div className="space-y-1">
                      <label htmlFor="fullName" className="font-medium">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="w-full outline-none p-3 rounded-lg bg-transparent border border-zinc-100/10"
                        placeholder="Your Full Name"
                        autoComplete="off"
                        {...register("name", { required: true })}
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="email" className="font-medium">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full outline-none p-3 rounded-lg bg-transparent border border-zinc-100/10"
                        placeholder="Your Email"
                        autoComplete="off"
                        {...register("email", { required: true })}
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="password" className="font-medium">
                        Password
                      </label>
                      <input
                        type="password"
                        className="w-full outline-none p-3 rounded-lg bg-transparent border border-zinc-100/10"
                        placeholder="Password"
                        autoComplete="off"
                        {...register("password", { required: true })}
                      />
                    </div>
                    <input
                      type="submit"
                      value={loading ? "creating..." : `Create Account`}
                      disabled={loading}
                      className={`w-full p-3 rounded-lg bg-cyan-900 text-white cursor-pointer duration-300 hover:bg-cyan-800`}
                    />
                  </div>
                  <p className="text-center text-sm">
                    or{" "}
                    <span
                      className="border-b border-cyan-400 font-semibold cursor-pointer select-none"
                      onClick={() => setCompleted(true)}
                    >
                      Login
                    </span>
                  </p>
                </div>
              </motion.form>
            </motion.div>
          </>
        ) : (
          <motion.div {...opacityVariant} key={"login"}>
            <h2 className="text-center font-extrabold text-3xl opacity-80">Login</h2>
            <motion.form
              {...opacityVariant}
              onSubmit={handleSubmitLogin(onLogin)}
              noValidate
              className="max-w-4xl mx-auto mt-5 flex items-center justify-center"
            >
              <div className="space-y-3 p-2">
                <div className="space-y-1">
                  <label htmlFor="email" className="font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full outline-none p-3 rounded-lg bg-transparent border border-zinc-100/10"
                    placeholder="Your Email"
                    autoComplete="off"
                    {...registerLogin("email", { required: true })}
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="password" className="font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full outline-none p-3 rounded-lg bg-transparent border border-zinc-100/10"
                    placeholder="Password"
                    autoComplete="off"
                    {...registerLogin("password", { required: true })}
                  />
                </div>
                <input
                  type="submit"
                  value={loading ? "hold..." : `Login`}
                  disabled={loading}
                  className={`w-full p-3 rounded-lg bg-cyan-900 text-white cursor-pointer duration-300 hover:bg-cyan-800`}
                />
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CreateAnAccount;
