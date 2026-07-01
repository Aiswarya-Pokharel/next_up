export default function Navbar() {
  return (
    <div>
      {/* Navbar */}
      <nav className="flex justify-between items-center py-2 px-8 bg-navbar shadow-md sticky top-0 z-10 shrink-0">
        <h2 className="font-logo font-bold text-lg italic text-secondary cursor-pointer">
          NextUp
        </h2>
        <div>{/* Profile */}</div>
      </nav>
    </div>
  );
}
