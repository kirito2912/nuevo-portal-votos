import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';

export default function Layout() {
  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <TopNav />
      <main className="p-4 sm:p-6 lg:p-8 w-full pt-16">
        <Outlet />
      </main>
    </div>
  );
}
