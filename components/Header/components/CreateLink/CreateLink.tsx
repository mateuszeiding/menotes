import React, { LegacyRef, forwardRef } from 'react';

import { ChangeEvent, useContext, useState } from 'react';
import TagPicker from '../../../TagPIcker/TagPicker';
import { TagsContext } from '@/context/useTagContext';
import './CreateLink.scss';
import Tag from '../../../Tag/Tag';
import { TagStateEnum } from '../../../Tag/TagStateEnum';
import { LinkCreateDto } from '@/Models/LinkCreateDto';

const CreateLink = forwardRef(function CreateLink(
    {},
    ref: LegacyRef<HTMLDivElement>
) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
    const { tags } = useContext(TagsContext);
    const [disable, setDisable] = useState(false);

    const createLink = () => {
        if (name && link && selectedTagIds) {
            setDisable(false);
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
            }).then(() => document.dispatchEvent(new Event('closeCreate')));
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
