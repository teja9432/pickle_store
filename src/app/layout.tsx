import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import ThemeRegistry from '@/theme/ThemeRegistry';
import { CartProvider } from '@/context/CartContext';

export const metadata: Metadata = {
  title: 'Dadi\'s Earthen Jar - Premium Handcrafted Indian Pickles',
  description: 'Order rich, mouthwatering green mango, garlic, and specialty pickles online. Hand-ground spices, natural cold-pressed mustard oil, and authentic curing processes. Fast checkout via WhatsApp!',
  keywords: 'pickles, indian achar, organic pickles, home made achar, spicy mango pickle, garlic pickle, non veg pickle, premium pickles, whatsapp order pickles',
  authors: [{ name: 'Dadi\'s Earthen Jar Team' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ThemeRegistry>
          <CartProvider>
            {children}
          </CartProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
