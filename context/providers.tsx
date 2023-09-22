'use client';

import { TagsContextProvider } from './useTagContext';
import { IChildren } from '@/interfaces/IChildren';

export function Providers({ children }: IChildren) {
    return <TagsContextProvider>{children}</TagsContextProvider>;
}
