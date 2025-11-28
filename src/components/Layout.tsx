import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}
