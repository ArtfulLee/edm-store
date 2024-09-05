// icons
import GraphicEqIcon from "@mui/icons-material/GraphicEq";

const Footer = () => {
  return (
    <>
      <footer className="bg-neutral-700">
        <div className="container mx-auto flex justify-between p-4">
          <div className="text-neutral-50">
            <div className="edms-logo flex items-center space-x-2">
              <GraphicEqIcon className="text-neutral-50" />
              <h1 className="text-neutral-50 font-bold text-lg">EDM STORE</h1>
            </div>
          </div>
          <div className="text-neutral-50">
            <div>
              Support:{" "}
              <a
                className="transition duration-100 text-sky-400 hover:text-sky-300"
                href="mailto:support@edm-store.com"
              >
                support@edm-store.com
              </a>
            </div>
            <div>
              Distribution:{" "}
              <a
                className="transition duration-100 text-sky-400 hover:text-sky-300"
                href="mailto:distribution@edm-store.com"
              >
                distribution@edm-store.com
              </a>
            </div>
          </div>
          <div className="text-neutral-50">© 2024 EDM STORE</div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
