import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Toast from "./Toast";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../util/firebaseConfig";
import { useState } from "react";
import { FirebaseError } from "firebase/app";

type LoginData = {
  email: string;
  password: string;
};
function LoginPage() {
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastColor, setToastColor] = useState<string>("");

  const navigate = useNavigate();

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(schema),
  });

  const handleGoogleAuth = async () => {
    try {
      const userGoogleAuth = await signInWithPopup(
        auth,
        new GoogleAuthProvider()
      );

      if (userGoogleAuth.user) {
        setShowToast(true);
        setToastMessage("Login successful");
        setToastColor("bg-green-500 text-green-900 border-green-600");

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error: unknown | any) {
      console.error(error instanceof Error, error.message);

      if (error instanceof FirebaseError) {
        setShowToast(true);
        setToastMessage("Google Login Failed, Please Try Again");
        setToastColor("bg-red-500 text-red-900 border-red-600");
      } else {
        setShowToast(true);
        setToastMessage("An Unexpected Error Occurred, Please Try Again");
        setToastColor("bg-red-500 text-red-900 border-red-600");
      }
    }
  };
  const onSubmit = async (data: LoginData) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      if (userCredentials.user) {
        setShowToast(true);
        setToastMessage("Login successful");
        setToastColor("bg-green-500 text-green-900 border-green-600");

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error: unknown | any) {
      console.error(error instanceof Error, error.message);

      if (error.code === "auth/invalid-credential") {
        setToastMessage("Invalid Email or Password, Please Try Again");
        setToastColor("bg-red-500 text-red-900 border-red-600");
        setShowToast(true);
      } else {
        setToastMessage("Login Failed");
        setToastColor("bg-red-500 text-red-900 border-red-600");
        setShowToast(true);
      }
    }
  };
  return (
    <div className="px-4 py-16 max-w-7xl mx-auto">
      {showToast && (
        <Toast
          message={toastMessage}
          colors={toastColor}
          onClose={() => setShowToast(false)}
          isVisible={showToast}
        />
      )}
      <h1 className="text-center text-3xl md:text-4xl mb-12">Log In</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6 md:flex md:flex-row md:justify-between md:items-center md:gap-16">
          {/* Login Form */}
          <div className="flex flex-col gap-4 justify-between w-full ">
            <h2 className="text-2xl font-semibold mb-4">Log In</h2>
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
            <button
              type="submit"
              className="bg-black text-white font-semibold py-3 px-6 rounded-md hover:transform hover:scale-105 duration-300 ease-in-out mt-4"
            >
              Sign In
            </button>

            <div className="flex items-center gap-4">
              <div className="h-px bg-gray-300 flex-1"></div>
              <span className="text-gray-500 font-medium">OR</span>
              <div className="h-px bg-gray-300 flex-1"></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleAuth}
              className="flex w-full items-start justify-center gap-2 hover:bg-black hover:text-white border border-black font-semibold py-3 px-6 rounded-md hover:transform hover:scale-105 duration-300 ease-in-out"
            >
              <Mail size={20} />
              Sign in with Google
            </button>
          </div>

          {/* New Customer Form */}
          <div className="flex flex-col gap-4 w-full">
            <h2 className="text-2xl mt-6 font-semibold">New Customer</h2>
            <p className="text-gray-500 font-semibold">
              Sign up for early Sale access plus tailored new arrivals, trends
              and promotions. To opt out, click unsubscribe in our emails.
            </p>

            <NavLink to={"/signup"}>
              <button className="bg-black text-white font-semibold py-3 px-6 rounded-md hover:transform hover:scale-105 duration-300 ease-in-out mt-4">
                Register
              </button>
            </NavLink>
          </div>
        </div>
      </form>
    </div>
  );
}
export default LoginPage;
