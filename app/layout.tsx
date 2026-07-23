import type { Metadata } from 'next';
import './globals.css';
import { PremiumCursor } from '../components/PremiumCursor';

export const metadata: Metadata = {
  title: 'LuxeVoyages – Morocco Collection',
  description: 'Luxury bespoke Morocco travel experiences, executive fleet, private riads, and AI concierge.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="bg-white text-slate-800 selection:bg-orange-500 selection:text-white font-sans antialiased min-h-screen flex flex-col">
        <PremiumCursor />
        {children}
      </body>
    </html>
  );
}

