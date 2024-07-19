import { Outlet } from "react-router-dom";
import Header from "../components/ui/Header/Header";
import Footer from "../components/ui/Footer/Footer";
import AudioPlayer from "../components/ui/AudioPlayer/AudioPlayer";

const MainLayout = () => {
  return (
    <>
      <div className="font-sans text-base not-italic font-normal tracking-normal flex flex-col justify-between bg-neutral-800 max-h-screen">
        <Header />
        <div className="overflow-auto">
          <div className="container mx-auto px-4">
            <Outlet />
          </div>
          <Footer />
        </div>
        <AudioPlayer />
      </div>
    </>
  );
};

export default MainLayout;
