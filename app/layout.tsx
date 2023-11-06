import Header from '@/components/Header/Header';
import { Providers } from '@/context/providers';
import { Fira_Code } from 'next/font/google';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'ME Notes',
    description: 'Notes',
};

const firaCode = Fira_Code({ subsets: ['latin'], display: 'swap' });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang='en'
            className={firaCode.className}
        >
            <body>
                <Providers>
                    <Header />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
