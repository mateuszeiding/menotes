import Header from '@/components/Header/Header';
import { Providers } from '@/context/providers';
import { Fira_Code } from 'next/font/google';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'ME Notes',
    description: 'Notes',
};

const firaCode = Fira_Code({ subsets: ['latin'] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <style
                jsx
                global
            >{`
                html {
                    font-family: ${firaCode.style.fontFamily};
                }
            `}</style>
            <body>
                <Providers>
                    <Header />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
