import Header from "../components/Header";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>
      <Header />
      <main className="min-h-screen max-w-7xl mx-auto">
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
