import { ReactNode } from 'react';
import Sidebar from "./components/Sidebar";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-grow p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
}
