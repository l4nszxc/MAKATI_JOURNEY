'use client';

import { usePathname } from 'next/navigation';
import Navigation from './Navigation';
import Footer from './Footer';

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <>
      {!isAdminPage && <Navigation />}
      <main className="flex-grow">{children}</main>
      {!isAdminPage && <Footer />}
    </>
  );
}
