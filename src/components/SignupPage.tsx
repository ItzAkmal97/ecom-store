import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { auth } from "../util/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

type SignupData = {
  email: string;
  password: string;
  confirmPassword: string;
};

function SignupPage() {
  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
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

  const onSubmit = async (data: SignupData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      if (userCredential.user) {
        navigate("/login");
      }
    } catch (error: any) {
      alert("An error occured while registering, Try Again");
      console.error(error instanceof Error, error.message);
    }
    reset();
  };

  return (
    <div className="h-screen px-4 sm:flex sm:flex-col sm:justify-center sm:items-center py-16">
      <h1 className="text-center text-3xl md:text-4xl">Register</h1>
      <form
        className="flex flex-col gap-4 mt-8 max-w-[500px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="h-14 w-full border focus:border-black transition duration-500 ease-in-out p-2 rounded-md"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

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
        </div>

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

        <NavLink to="/login">
          <button
            type="button"
            className="w-full h-full hover:bg-black hover:text-white border border-black font-semibold py-3 px-6 rounded-md hover:transform hover:scale-105 duration-300 ease-in-out"
          >
            Login
          </button>
        </NavLink>
      </form>
    </div>
  );
}

export default SignupPage;
