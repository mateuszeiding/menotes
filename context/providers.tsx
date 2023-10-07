'use client';

import { TagsContextProvider } from './useTagContext';
import { IChildren } from '@/interfaces/IChildren';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';
import { LinksContextProvider } from './useLinkContext';

export function Providers({
    session,
    children,
}: IChildren & SessionProviderProps) {
    return (
        <SessionProvider session={session}>
            <LinksContextProvider>
                <TagsContextProvider>{children}</TagsContextProvider>
            </LinksContextProvider>
        </SessionProvider>
    );
}
