"use client";
import { SubmitHandler, useForm } from "react-hook-form";

interface Inputs {
  name: string;
  email: string;
  password: string;
  // confirmPassword: string;
  // phoneNumber: string;
}

const CreateAnAccount = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <div className="container pt-10">
      <h2 className="text-center font-extrabold text-3xl opacity-80">Create An Account</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="max-w-4xl mx-auto mt-5 flex items-center justify-center"
      >
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
            value="Create Account"
            className="w-full p-3 rounded-lg bg-cyan-900 text-white cursor-pointer duration-300 hover:bg-cyan-800"
          />
        </div>
      </form>
    </div>
  );
};

export default CreateAnAccount;
