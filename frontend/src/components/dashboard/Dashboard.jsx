import Main from "./Main";
import Slide from "./Slide";

export default function Dashboard() {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* --------------Navbar--------------- */}
      <nav className="flex justify-between items-center py-2 px-8 bg-navbar shadow-md sticky top-0 z-10 shrink-0">
        <h2 className="font-logo font-bold text-lg italic text-secondary cursor-pointer">
          NextUp
        </h2>
        <div>{/* --------------Profile--------------- */}</div>
      </nav>

      {/* -----------Left Bars-------------------------- */}
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 bg-navbar h-full overflow-y-auto">
          <Slide />
        </div>

        {/* --------------Main dashboard--------------- */}
        <div className="bg-secondary w-full p-6 overflow-y-auto">
          <Main />
        </div>
      </div>
    </div>
  );
}
