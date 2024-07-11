import { Outlet } from "react-router-dom";
import Header from "../components/ui/Header/Header";
import Footer from "../components/ui/Footer/Footer";

const MainLayout = () => {
  return (
    <>
      <div className="flex flex-col justify-between bg-neutral-800 h-screen w-screen">
        <Header />
        <div className="container mx-auto px-4">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
