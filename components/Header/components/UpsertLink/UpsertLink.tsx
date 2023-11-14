import React, { LegacyRef, forwardRef } from 'react';

import { ChangeEvent, useContext, useState } from 'react';
import TagPicker from '@/components/TagPIcker/TagPicker';
import { TagsContext } from '@/context/useTagContext';
import { LinksContext } from '@/context/useLinkContext';
import './UpsertLink.scss';
import Tag from '@/components/Tag/Tag';
import { TagStateEnum } from '@/components/Tag/TagStateEnum';
import { LinkCreateDto } from '@/Models/LinkCreateDto';
import { ILinkDto } from '@/Models/LinkDto';
import { useSession } from 'next-auth/react';

const UpsertLink = forwardRef(function CreateLink(
    props: ILinkDto & { edit: boolean },
    ref: LegacyRef<HTMLDivElement>
) {
    const [name, setName] = useState(props.name ?? '');
    const [link, setLink] = useState(props.href ?? '');
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>(
        props.tags.map((tag) => tag.id) ?? []
    );
    const { tags } = useContext(TagsContext);
    const { links, setLinks } = useContext(LinksContext);
    const [disable, setDisable] = useState(false);
    const { data: session } = useSession();

    const createLink = async () => {
        if (name && link && selectedTagIds) {
            setDisable(false);
            const payload: LinkCreateDto = {
                name,
                href: link,
                tagIds: selectedTagIds,
            };
            let body: ILinkDto;
            if (session?.user?.name !== 'hello') {
                const res = await fetch('api/links', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });
                body = await res.json();
            } else {
                body = {
                    id: tags.sort((a, b) => a.id - b.id)[0].id + 1,
                    name,
                    href: link,
                    tags: tags.filter((tag) => selectedTagIds.includes(tag.id)),
                };
            }
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

    const editLink = async () => {
        if (name && link && props.id && selectedTagIds) {
            setDisable(false);
            const payload: LinkCreateDto = {
                id: props.id,
                name,
                href: link,
                tagIds: selectedTagIds,
            };
            let body: ILinkDto;
            if (session?.user?.name !== 'hello') {
                const res = await fetch('api/links', {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });
                body = await res.json();
            } else {
                body = {
                    id: props.id,
                    name,
                    href: link,
                    tags: tags.filter((tag) => selectedTagIds.includes(tag.id)),
                };
            }
            setLinks((prevLinks) =>
                prevLinks.map((link) =>
                    link.id === body.id
                        ? {
                              ...link,
                              ...body,
                              tags: tags.filter((tag) =>
                                  selectedTagIds.includes(tag.id)
                              ),
                          }
                        : link
                )
            );
            document.dispatchEvent(new Event('closeUpsertLink'));
        }
    };

    return (
        <div
            className='card'
            ref={ref}
        >
            <div className='d-flex justify-content-between align-items-center'>
                <div>Add new link</div>
                <button
                    className='btn'
                    disabled={disable}
                    onClick={() => (props.edit ? editLink() : createLink())}
                >
                    {props.edit ? 'Edit' : 'Create'}
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
                <TagPicker
                    initialTagIds={selectedTagIds}
                    selectedTagIdsCallback={setSelectedTagIds}
                />
            </div>
        </div>
    );
});

export default UpsertLink;
