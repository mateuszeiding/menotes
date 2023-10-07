'use client';

import { useContext, useEffect, useState } from 'react';

import { ILinkDto } from '@/Models/LinkDto';
import LinkCard from '@/components/LinkCard/LinkCard';
import '@/styles/import.scss';
import { TagsContext } from '@/context/useTagContext';
import { useSession } from 'next-auth/react';

export default function Home() {
    const { data: session } = useSession();

    const [links, setLinks] = useState<ILinkDto[]>([]);
    const { setTags, selectedTagIds } = useContext(TagsContext);
    const filteredLinks = selectedTagIds.length
        ? links.filter((x) =>
              selectedTagIds.every((tagId) =>
                  x.tags.some((y) => y.id === tagId)
              )
          )
        : links;

    useEffect(() => {
        fetch('api/tags', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => setTags(data));

        fetch('api/links', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((data) => setLinks(data));
    }, [setTags]);

    if (!session) return <></>;

    return (
        <main>
            {links &&
                filteredLinks.map((link: ILinkDto) => (
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
