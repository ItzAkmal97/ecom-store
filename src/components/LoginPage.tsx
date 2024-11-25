import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

type LoginData = {
  email: string;
  password: string;
};
function LoginPage() {
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

  const onSubmit = () => {
    alert("User Logged in Successfully");
  };
  return (
    <div className="px-4 py-16">
      <h1 className="text-center text-3xl md:text-4xl mt-8 mb-4">Log In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-6 mt-8 md:flex md:flex-row md:justify-around">
          <div className="flex flex-col gap-4 items-start justify-between w-full md:w-1/2">
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
          </div>

          <div className="flex flex-col gap-6 items-start md:max-w-lg">
            <h2 className="text-2xl mt-6 font-bold">New Customer</h2>
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
