//components
import AudioCards from "../components/ui/AudioCards/AudioCards";

const Admin = () => {
  return (
    <>
      <div className="container mx-auto my-4">
        <h1 className="text-2xl font-bold text-neutral-50">Audio data table</h1>
      </div>
      {/* Отображаем таблицу аудио файлов для редактирования. */}
      <AudioCards />
    </>
  );
};

export default Admin;
