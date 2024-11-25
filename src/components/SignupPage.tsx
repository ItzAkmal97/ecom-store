import { NavLink } from "react-router-dom";
function SignupPage() {
  return (
    <div className="px-4 md:flex md:flex-col justify-center items-center">
      <h1 className="text-center text-2xl md:text-4xl mt-8 mb-4">Register</h1>
      <form className="flex flex-col gap-6 mt-16 w-full md:w-1/2">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>

        <input
          type="name"
          placeholder="First Name"
          className="h-14 w-full border focus:border-black transition duration-500 ease-in-out p-2 rounded-md"
        />

        <input
          type="name"
          placeholder="Last Name"
          className="h-14 w-full border focus:border-black transition duration-500 ease-in-out p-2 rounded-md"
        />

        <input
          type="email"
          placeholder="Email"
          className="h-14 w-full border focus:border-black transition duration-500 ease-in-out p-2 rounded-md"
        />

        <input
          type="password"
          placeholder="Password"
          className="h-14 w-full border focus:border-black transition duration-500 ease-in-out p-2 rounded-md"
        />

        <p className="text-gray-500">
          Sign up for early Sale access plus tailored new arrivals, trends and
          promotions. To opt out, click unsubscribe in our emails.
        </p>

        <button
          type="submit"
          className="bg-black text-white font-semibold py-3 px-6 rounded-md hover:transform hover:scale-105 duration-300 ease-in-out mt-4"
        >
          Register
        </button>

        <div className="hover:bg-black hover:text-white border border-black font-semibold py-3 px-6 rounded-md hover:transform hover:scale-105 duration-300 ease-in-out">
        <NavLink to={"/login"}>
          <button className="w-full">
            Login
          </button>
        </NavLink>
        </div>
        
      </form>
    </div>
  );
}

export default SignupPage;
