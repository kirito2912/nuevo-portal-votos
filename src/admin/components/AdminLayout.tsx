import { ReactNode } from 'react';
import AdminHeader from './AdminHeader';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen bg-dark-bg text-white">
      <AdminHeader />
      <main className="p-8">
        {children}
      </main>
    </div>
  );
}
