import React, { LegacyRef, forwardRef } from 'react';

import { ChangeEvent, useContext, useState } from 'react';
import TagPicker from '@/components/TagPIcker/TagPicker';
import { TagsContext } from '@/context/useTagContext';
import { LinksContext } from '@/context/useLinkContext';
import './CreateLink.scss';
import Tag from '@/components/Tag/Tag';
import { TagStateEnum } from '@/components/Tag/TagStateEnum';
import { LinkCreateDto } from '@/Models/LinkCreateDto';
import { ILinkDto } from '@/Models/LinkDto';

const CreateLink = forwardRef(function CreateLink(
    {},
    ref: LegacyRef<HTMLDivElement>
) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
    const { tags } = useContext(TagsContext);
    const { links, setLinks } = useContext(LinksContext);
    const [disable, setDisable] = useState(false);

    const createLink = async () => {
        if (name && link && selectedTagIds) {
            setDisable(false);
            const payload: LinkCreateDto = {
                name,
                href: link,
                tagIds: selectedTagIds,
            };

            const res = await fetch('api/links', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const body: ILinkDto = await res.json();
            setLinks([
                ...links,
                {
                    ...body,
                    tags: tags.filter((tag) => selectedTagIds.includes(tag.id)),
                },
            ]);
            document.dispatchEvent(new Event('closeCreateLink'));
        }
    };

    return (
        <div
            className='card'
            ref={ref}
        >
            <div className='d-flex justify-content-between'>
                <div>Add new link</div>
                <button
                    className='card-create'
                    disabled={disable}
                    onClick={createLink}
                >
                    Create
                </button>
            </div>
            <input
                className='card-input'
                type='text'
                placeholder='name'
                value={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                }
                disabled={disable}
            ></input>
            <input
                className='card-input'
                type='text'
                placeholder='link'
                value={link}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setLink(e.target.value)
                }
                disabled={disable}
            ></input>
            <div
                className={['tag-container', disable && 'user-events-none']
                    .filter(Boolean)
                    .join(' ')}
            >
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
});

export default CreateLink;
