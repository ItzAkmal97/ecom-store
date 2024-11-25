import { NavLink } from "react-router-dom";
function LoginPage() {
  return (
    <div className="px-4">
      <h1 className="text-center text-2xl md:text-4xl mt-8 mb-4">
        Log In
      </h1>
      <form>
        <div className="flex flex-col gap-6 mt-16 md:flex md:flex-row md:justify-around">
          <div className="flex flex-col gap-4 items-start justify-between w-full md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Log In</h2>
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
        <button
          type="submit"
          className="bg-black text-white font-semibold py-3 px-6 rounded-md hover:transform hover:scale-105 duration-300 ease-in-out mt-4"
        >
          Sign In
        </button>
          </div>
        
        <div className="flex flex-col gap-6 items-start md:max-w-lg">
        <h2 className="text-2xl mt-6 font-bold">New Customer</h2>
        <p>
          Sign up for early Sale access plus tailored new arrivals, trends and
          promotions. To opt out, click unsubscribe in our emails.
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
