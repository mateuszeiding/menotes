'use client';

import { useEffect, useState } from 'react';

import Tag from '@/components/Tag/Tag';
import { TagStateEnum } from '@/components/Tag/TagStateEnum';
import { ITagDto } from '@/dtos/TagDto';

export default function Home() {
    const [tags, setTags] = useState<ITagDto[]>([]);

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
            });
    }, []);

    return (
        <main>
            <div>test</div>
            {tags &&
                tags.map((tag: ITagDto) => (
                    <Tag
                        text={tag.name}
                        colorHex={tag.color_hex}
                        key={tag.id}
                        state={TagStateEnum.None}
                    />
                ))}
        </main>
    );
}
