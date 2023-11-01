'use client';

import { useCallback, useContext, useEffect, useState } from 'react';

import { ILinkDto } from '@/Models/LinkDto';
import LinkCard from '@/components/LinkCard/LinkCard';
import '@/styles/import.scss';
import { TagsContext } from '@/context/useTagContext';
import { useSession } from 'next-auth/react';
import { LinksContext } from '@/context/useLinkContext';

export default function Home() {
    const { data: session } = useSession();

    const { setTags, selectedTagIds } = useContext(TagsContext);
    const { links, setLinks } = useContext(LinksContext);
    const filteredLinks = selectedTagIds.length
        ? links.filter((x) =>
              selectedTagIds.every((tagId) =>
                  x.tags.some((y) => y.id === tagId)
              )
          )
        : links;

    const catchedFetchTags = useCallback(async () => {
        const res = await fetch('api/tags', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        setTags(data);
    }, [setTags]);

    const catchedFetchLinks = useCallback(async () => {
        const res = await fetch('api/links', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        setLinks(data);
    }, [setLinks]);

    useEffect(() => {
        catchedFetchTags();
        catchedFetchLinks();
    }, [catchedFetchTags, catchedFetchLinks]);

    if (!session) return <></>;

    return (
        <main>
            {filteredLinks.map((link: ILinkDto) => (
                <LinkCard
                    name={link.name}
                    href={link.href}
                    tags={link.tags}
                    key={link.id}
                />
            ))}
        </main>
    );
}
