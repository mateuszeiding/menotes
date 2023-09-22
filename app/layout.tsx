import Header from '@/components/Header/Header';
import { Providers } from '@/context/providers';
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
                <Providers>
                    <Header />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
