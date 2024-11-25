import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// import { useState } from "react";

type SignupData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
function SignupPage() {
  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().min(2).required(),
    email: yup.string().email().required(),
    password: yup
      .string()
      .required()
      .min(8, "Password must be at least 8 characters long")
      .max(128, "Password must be no more than 128 characters long")
      .matches(
        /^(?=.*[a-z])/,
        "Password must contain at least one lowercase letter"
      )
      .matches(
        /^(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter"
      )
      .matches(/^(?=.*[0-9])/, "Password must contain at least one number")
      .matches(
        /^(?=.*[!@#$%^&*()_+={};:<>?])/,
        "Password must contain at least one special character"
      ),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = () => {
    alert("Form submitted successfully");
    reset();
  };

  return (
    <div className="px-4 sm:flex sm:flex-col sm:justify-center sm:items-center py-16">
      <h1 className="text-center text-3xl md:text-4xl mt-8 mb-4">Register</h1>
      <form
        className="flex flex-col gap-6 mt-8 max-w-[500px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-semibold mb-4">Register</h2>

        <input
          type="text"
          placeholder="First Name"
          className="h-14 w-full border focus:border-black transition duration-500 ease-in-out p-2 rounded-md"
          {...register("firstName")}
        />
        {errors.firstName && (
          <p className="text-red-500">{"First name is required"}</p>
        )}
        <input
          type="text"
          placeholder="Last Name"
          className="h-14 w-full border focus:border-black transition duration-500 ease-in-out p-2 rounded-md"
          {...register("lastName")}
        />
        {errors.lastName && (
          <p className="text-red-500">{"Last name must be at least 2 characters and is required"}</p>
        )}
        <input
          type="email"
          placeholder="Email"
          className="h-14 w-full border focus:border-black transition duration-500 ease-in-out p-2 rounded-md"
          {...register("email")}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <input
          type="password"
          placeholder="Password"
          className="h-14 w-full border focus:border-black transition duration-500 ease-in-out p-2 rounded-md"
          {...register("password")}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
        <input
          type="password"
          placeholder="Confirm Password"
          className="h-14 w-full border focus:border-black transition duration-500 ease-in-out p-2 rounded-md"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}
        <p className="text-gray-500 font-semibold">
          Sign up for early Sale access plus tailored new arrivals, trends and
          promotions. To opt out, click unsubscribe in our emails.
        </p>

        <button
          type="submit"
          className="bg-black text-white font-semibold py-3 px-6 rounded-md hover:transform hover:scale-105 duration-300 ease-in-out mt-4"
        >
          Register
        </button>

        <NavLink to={"/login"}>
          <button className="w-full h-full hover:bg-black hover:text-white border border-black font-semibold py-3 px-6 rounded-md hover:transform hover:scale-105 duration-300 ease-in-out">
            Login
          </button>
        </NavLink>
      </form>
    </div>
  );
}

export default SignupPage;
