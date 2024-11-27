import type { Metadata } from 'next';
import { Lora, Poppins, Roboto } from 'next/font/google';
import './globals.css';

const roboto = Roboto({
  display: 'swap',
  weight: ['100', '300', '400', '500', '700', '900'],
  fallback: ['sans-serif'],
  variable: '--font-roboto',
});

const lora = Lora({
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  fallback: ['serif'],
  variable: '--font-lora',
});

const poppins = Poppins({
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
      <body className={`${roboto.variable} ${lora.variable} ${poppins.variable}`}>{children}</body>
    </html>
  );
}
