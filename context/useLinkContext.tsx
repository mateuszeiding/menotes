import { ILinkDto } from '@/Models/LinkDto';
import { IChildren } from '@/interfaces/IChildren';
import { createContext, useState } from 'react';

interface ILinksContext {
    links: ILinkDto[];
    setLinks: (tags: ILinkDto[]) => void;
}

const LinksContext = createContext<ILinksContext>({
    links: [],
    setLinks: () => [],
});

const LinksContextProvider = ({ children }: IChildren) => {
    const [links, setLinks] = useState<ILinkDto[]>([]);

    return (
        <LinksContext.Provider value={{ links, setLinks }}>
            {children}
        </LinksContext.Provider>
    );
};

export { LinksContext, LinksContextProvider };
