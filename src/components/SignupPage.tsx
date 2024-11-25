import { NavLink } from "react-router-dom";
function SignupPage() {
  return (
    <div className="px-4 sm:flex sm:flex-col sm:justify-center sm:items-center py-16">
      <h1 className="text-center text-3xl md:text-4xl mt-8 mb-4">Register</h1>
      <form className="flex flex-col gap-6 mt-8 max-w-[500px]">
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
