import { Outlet, Link, useNavigate } from 'react-router-dom';

export default function Layout() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 border-t-4 border-brand font-sans">
      <header className="p-4 border-b border-gray-200 flex justify-between items-center max-w-6xl mx-auto w-full">
        <Link to="/" className="text-xl font-bold text-brand">CampusFix</Link>
        <nav className="flex space-x-6">
          {token ? (
            <>
              <Link to="/dashboard" className="text-sm font-medium hover:underline">Dashboard</Link>
              <Link to="/report-lost" className="text-sm font-medium hover:underline">Report Lost</Link>
              <Link to="/report-found" className="text-sm font-medium hover:underline">Report Found</Link>
              <button onClick={handleLogout} className="text-sm font-medium hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium hover:underline">Login</Link>
              <Link to="/register" className="text-sm font-medium hover:underline">Register</Link>
            </>
          )}
        </nav>
      </header>
      <main className="p-8 max-w-6xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}
