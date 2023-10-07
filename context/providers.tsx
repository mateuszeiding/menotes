'use client';

import { TagsContextProvider } from './useTagContext';
import { IChildren } from '@/interfaces/IChildren';
import { SessionProvider, SessionProviderProps } from 'next-auth/react';

export function Providers({
    session,
    children,
}: IChildren & SessionProviderProps) {
    return (
        <SessionProvider session={session}>
            <TagsContextProvider>{children}</TagsContextProvider>
        </SessionProvider>
    );
}
