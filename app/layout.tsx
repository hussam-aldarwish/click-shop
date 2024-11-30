import { Footer, Header, TopHeader } from '@/components/layout';
import Providers from '@/components/layout/Providers';
import type { Metadata } from 'next';
import { Lora, Poppins, Roboto } from 'next/font/google';
import './globals.css';

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '300', '400', '500', '700', '900'],
  fallback: ['sans-serif'],
  variable: '--font-roboto',
});

const lora = Lora({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  fallback: ['serif'],
  variable: '--font-lora',
});

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  fallback: ['sans-serif'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Click Shop',
    default: 'Click Shop',
  },
  description: 'E-commerce platform for all your shopping needs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
      <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
      <body className={`${roboto.variable} ${lora.variable} ${poppins.variable}`}>
        <Providers>
          <TopHeader />
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
