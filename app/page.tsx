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
    const { tags, setTags, selectedTagIds } = useContext(TagsContext);
    const filteredLinks = selectedTagIds.length
        ? links.filter((x) =>
              selectedTagIds.every((tagId) =>
                  x.tags.some((y) => y.id === tagId)
              )
          )
        : links;

    useEffect(() => {
        !session &&
            fetch('api/tags', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setTags(data);
                    setLinks([
                        {
                            id: 0,
                            name: 'Color random pallet',
                            href: 'http://colormind.io',
                            tags: [data[1], data[2]],
                        },
                        {
                            id: 1,
                            name: 'Magenta a11y',
                            href: 'https://www.magentaa11y.com',
                            tags: [data[0]],
                        },
                    ]);
                });
    }, [setTags, session]);

    if (!session) return <></>;

    return (
        <main>
            {tags &&
                links &&
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
