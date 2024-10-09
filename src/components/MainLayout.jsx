import { Link, useNavigate } from "react-router-dom";

function MainLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="flex flex-col mx-auto bg-gradient-to-b from-blue-50 to-blue-100 min-h-screen">
      <header className="bg-blue-900 text-white py-6 px-10 flex justify-between items-center shadow-lg">
        <h1 className="text-4xl font-bold tracking-wide">LOGO</h1>
        <nav>
          <ul className="flex space-x-8 text-lg">
            <li>
              <Link 
                to="/" 
                className="hover:text-green-400 transition-colors duration-300 ease-in-out font-semibold tracking-wide">
                HOME
              </Link>
            </li>
            <li>
              <button 
                onClick={handleLogout} 
                className="hover:text-red-400 transition-colors duration-300 ease-in-out font-semibold tracking-wide">
                LOG OUT
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <main className="p-10 flex-grow bg-white shadow-md rounded-lg mx-8 mt-8 mb-10">
        {children}
      </main>
    </div>
  );
}

export default MainLayout;
