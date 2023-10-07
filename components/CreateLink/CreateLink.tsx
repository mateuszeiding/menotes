import React from 'react';

import { ChangeEvent, useContext, useState } from 'react';
import TagPicker from '../TagPIcker/TagPicker';
import { TagsContext } from '@/context/useTagContext';
import './CreateLink.scss';
import Tag from '../Tag/Tag';
import { TagStateEnum } from '../Tag/TagStateEnum';
import { LinkCreateDto } from '@/Models/LinkCreateDto';

export default function CreateLink() {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
    const { tags } = useContext(TagsContext);

    const createLink = () => {
        if (name && link && selectedTagIds) {
            const payload: LinkCreateDto = {
                name,
                href: link,
                tagIds: selectedTagIds,
            };

            fetch('api/links', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
        }
    };

    return (
        <div className='card'>
            <button onClick={createLink}>Create</button>
            <input
                className='card-input'
                type='text'
                placeholder='name'
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                }
            ></input>
            <input
                className='card-input'
                type='text'
                placeholder='link'
                value={link}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setLink(e.target.value)
                }
            ></input>
            <div className='tag-container'>
                <div className='card-tags'>
                    {tags
                        .filter((t) => selectedTagIds.includes(t.id))
                        .map((tag) => (
                            <Tag
                                key={tag.id}
                                colorHex={tag.color_hex}
                                text={tag.name}
                                state={TagStateEnum.None}
                            />
                        ))}
                </div>
                <TagPicker selectedTagIdsCallback={setSelectedTagIds} />
            </div>
        </div>
    );
}
