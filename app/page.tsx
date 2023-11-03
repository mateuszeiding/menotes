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

    const { tags, setTags, selectedTagIds } = useContext(TagsContext);
    const { links, setLinks } = useContext(LinksContext);
    const filteredLinks: ILinkDto[] = selectedTagIds.length
        ? links.filter((x) =>
              selectedTagIds.every((tagId) =>
                  x.tags.some((y) => y.id === tagId)
              )
          )
        : links;

    useEffect(() => {
        const fetchTags = async () => {
            if (session && !tags.length) {
                const res = await fetch('api/tags', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await res.json();
                console.log('tags', data);

                setTags([...tags, ...data]);
            }
        };

        const fetchLinks = async () => {
            if (session && !links.length) {
                const res = await fetch('api/links', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await res.json();
                console.log(data);
                setLinks([...links, ...data]);
            }
        };

        fetchTags();
        fetchLinks();
    }, [links, session, setLinks, setTags, tags]);

    if (!session) return <></>;

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
