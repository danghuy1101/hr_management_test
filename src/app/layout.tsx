// src/app/layout.tsx
import '../styles/globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'Human Resource Management',
  description: 'A simple HR management system',
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/admin/employees">Employee Management</Link></li>
            <li><Link href="/admin/leaveRequests">Leave Requests</Link></li>
            <li><Link href="/admin/salaryManagement">Salary Management</Link></li>
          </ul>
        </nav>
      </body>
    </html>
  );
}
