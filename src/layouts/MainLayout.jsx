import { Outlet } from "react-router-dom";
import Header from "../components/ui/Header/Header";
import Footer from "../components/ui/Footer/Footer";
import AudioPlayer from "../components/ui/AudioPlayer/AudioPlayer";

const MainLayout = () => {
  return (
    <>
      <div className="flex flex-col justify-between bg-neutral-800 min-h-screen">
        <Header />
        <div className="container mx-auto px-4">
          <Outlet />
        </div>
        <AudioPlayer />
        <Footer />
      </div>
    </>
  );
};

export default MainLayout;
