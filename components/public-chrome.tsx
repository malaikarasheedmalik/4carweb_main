'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Chatbot } from '@/components/chatbot';

export function PublicChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || '';
  const isAdminPortal = pathname === '/car-console' || pathname.startsWith('/car-console/');
  const isLegacyAdmin = pathname === '/admin' || pathname.startsWith('/admin/');

  if (isAdminPortal || isLegacyAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <div className="site-shine" aria-hidden="true" />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <Chatbot />
    </>
  );
}
