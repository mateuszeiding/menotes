'use client';

import '@/styles/import.scss';
import Header from '@/components/Header/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'ME Notes',
    description: 'Notes',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body>
                <Header />
                {children}
            </body>
        </html>
    );
}
