import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { auth } from "../util/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { Mail } from "lucide-react";
import Toast from "./Toast";
import { FirebaseError } from "firebase/app";
import { Eye, EyeOff } from "lucide-react";
import { RootState } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import {
  setShowPassword,
  setShowToast,
  setToastColor,
  setToastMessage,
} from "../features/loginSignupSlice";

type SignupData = {
  email: string;
  password: string;
  confirmPassword: string;
};

function SignupPage() {
  const navigate = useNavigate();
  const { showPassword, showToast, toastColor, toastMessage } = useSelector(
    (state: RootState) => state.loginSignup
  );

  const dispatch = useDispatch();

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

  const handleGoogleAuth = async () => {
    try {
      const userGoogleAuth = await signInWithPopup(
        auth,
        new GoogleAuthProvider()
      );

      if (userGoogleAuth.user) {
        dispatch(setShowToast(true));
        dispatch(setToastMessage("Login successful"));
        dispatch(setToastColor("bg-green-500 text-green-900 border-green-600"));

        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error: unknown) {
      console.error(error instanceof FirebaseError, error);

      if (error instanceof FirebaseError) {
        dispatch(setShowToast(true));
        dispatch(setToastMessage("Google Login Failed, Please Try Again"));
        dispatch(setToastColor("bg-red-500 text-red-900 border-red-600"));
      } else {
        dispatch(setShowToast(true));
        dispatch(
          setToastMessage("An Unexpected Error Occurred, Please Try Again")
        );
        dispatch(setToastColor("bg-red-500 text-red-900 border-red-600"));
      }
    }
  };

  const onSubmit = async (data: SignupData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      if (userCredential.user) {
        dispatch(setShowToast(true));
        dispatch(setToastMessage("Registration successful"));
        dispatch(setToastColor("bg-green-500 text-green-100 border-green-600"));

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error: unknown) {
      console.error(error instanceof FirebaseError, error);

      if (
        error instanceof FirebaseError &&
        error.code === "auth/email-already-in-use"
      ) {
        dispatch(setToastMessage("Email Already In Use"));
        dispatch(setToastColor("bg-red-500 text-red-100 border-red-600"));
        dispatch(setShowToast(true));
      } else if (
        error instanceof FirebaseError &&
        error.code === "auth/invalid-email"
      ) {
        dispatch(setToastMessage("Invalid Email"));
        dispatch(setToastColor("bg-red-500 text-red-100 border-red-600"));
        dispatch(setShowToast(true));
      } else {
        dispatch(setToastMessage("Registration Failed"));
        dispatch(setToastColor("bg-red-500 text-red-100 border-red-600"));
        dispatch(setShowToast(true));
      }
    }

    reset();
  };

  return (
    <div className="px-4 sm:flex sm:flex-col sm:justify-center sm:items-center py-16">
      <h1 className="text-center text-3xl md:text-4xl mb-12">Register</h1>
      <form
        className="flex flex-col gap-4 mt-8 max-w-[500px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-4">
          {showToast && (
            <Toast
              message={toastMessage}
              isVisible={showToast}
              onClose={() => dispatch(setShowToast(false))}
              colors={toastColor}
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="h-14 w-full border focus:border-black transition duration-500 ease-in-out p-2 rounded-md"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="h-14 w-full border focus:border-black transition duration-500 ease-in-out p-2 rounded-md pr-10"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => dispatch(setShowPassword(!showPassword))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="h-14 w-full border focus:border-black transition duration-500 ease-in-out p-2 rounded-md pr-10"
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => dispatch(setShowPassword(!showPassword))}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
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
          Start with Google
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
