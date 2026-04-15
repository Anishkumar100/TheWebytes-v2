import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', display: 'swap' });

export const metadata = {
  title: 'TheWebytes - Premium Software Development & Digital Agency',
  description: 'Expert web development, app development, UI/UX design, and digital marketing services.',
  keywords: ['web development', 'app development', 'digital agency', 'UI/UX design'],
  authors: [{ name: 'TheWebytes' }],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
