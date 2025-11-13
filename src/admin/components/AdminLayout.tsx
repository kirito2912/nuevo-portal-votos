import { ReactNode } from 'react';
import AdminHeader from './AdminHeader';
import '../../styles/admin/index.css';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="admin-layout">
      <AdminHeader />
      <main className="admin-main-content">
        {children}
      </main>
    </div>
  );
}
