import GraphicEqIcon from "@mui/icons-material/GraphicEq";

const Header = () => {
  return (
    <>
      <header className=" bg-neutral-900">
        <div className="container mx-auto flex gap-x-16 items-center p-4">
          <div className="edms-logo flex items-center space-x-2">
            <GraphicEqIcon className="text-neutral-50" />
            <div className="text-neutral-50 font-bold text-lg">EDM STORE</div>
          </div>
          <div className="flex text-neutral-50 space-x-8">
            <div>Home</div>
            <div>Genres</div>
          </div>
          {/* Сюда надо будет добавить авторизацию */}
        </div>
      </header>
    </>
  );
};

export default Header;
