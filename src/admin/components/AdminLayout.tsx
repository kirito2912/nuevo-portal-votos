import { ReactNode } from 'react';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import '../../styles/admin/index.css';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="admin-layout">
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 admin-main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
