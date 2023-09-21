'use client';

import { useEffect, useState } from 'react';

import { ITagDto } from '@/Models/TagDto';
import { ILinkDto } from '@/Models/LinkDto';
import LinkCard from '@/components/LinkCard/LinkCard';

export default function Home() {
    const [tags, setTags] = useState<ITagDto[]>([]);
    const [links, setLinks] = useState<ILinkDto[]>([]);

    useEffect(() => {
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
                        name: 'test',
                        href: 'https://google.com',
                        tags: [data[1], data[2]],
                    },
                    {
                        id: 1,
                        name: 'test2',
                        href: 'https://google.com',
                        tags: [data[0]],
                    },
                ]);
            });
    }, []);

    return (
        <main>
            {tags &&
                links &&
                links.map((link: ILinkDto) => (
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
