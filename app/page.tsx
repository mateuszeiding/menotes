'use client';

import { useCallback, useContext, useEffect, useState } from 'react';

import { ILinkDto } from '@/Models/LinkDto';
import LinkCard from '@/components/LinkCard/LinkCard';
import '@/styles/import.scss';
import { TagsContext } from '@/context/useTagContext';
import { useSession } from 'next-auth/react';
import { LinksContext } from '@/context/useLinkContext';
import { ITagDto } from '@/Models/TagDto';

export default function Home() {
    const { data: session } = useSession();
    const { tags, setTags, selectedTagIds } = useContext(TagsContext);
    const { links, setLinks } = useContext(LinksContext);

    if (!session) return <></>;

    !tags.length &&
        (async () => {
            const res = await fetch('api/tags', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const dbTags = await res.json();
            setTags([...tags, ...dbTags]);
        })();

    !links.length &&
        (async () => {
            const res = await fetch('api/links', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const dbLinks = await res.json();
            setLinks([...links, ...dbLinks]);
        })();

    const filteredLinks: ILinkDto[] = selectedTagIds.length
        ? links.filter((x) =>
              selectedTagIds.every((tagId) =>
                  x.tags.some((y) => y.id === tagId)
              )
          )
        : links;

    return (
        <main>
            {filteredLinks.map((link) => (
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
