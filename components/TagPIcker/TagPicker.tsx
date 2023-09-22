import { ChangeEvent, useContext, useState } from 'react';

import Tag from '@/components/Tag/Tag';
import { TagStateEnum } from '@/components/Tag/TagStateEnum';
import { TagsContext } from '@/context/useTagContext';
import { useClickAway } from '@uidotdev/usehooks';
import './TagPicker.scss';

interface ITagPicker {
    selectedTagIdsCallback?: (tagIds: number[]) => number[];
}

export default function TagPicker({ selectedTagIdsCallback }: ITagPicker) {
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);
    let selectedTagIdsOut: number[] = [];

    const ref = useClickAway<HTMLDivElement>(() => {
        setOpen(false);
    });
    const { tags, selectedTagIds, setSelectedTagIds } = useContext(TagsContext);

    const onSearchTermChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setOpen(true);
    };

    const handleTagClick = (tagId: number) => {
        if (selectedTagIdsCallback) {
            if (selectedTagIdsOut.includes(tagId)) {
                selectedTagIdsOut = selectedTagIdsOut.filter(
                    (x) => x !== tagId
                );
            } else {
                selectedTagIdsOut = [...selectedTagIdsOut, tagId];
                selectedTagIdsCallback(selectedTagIdsOut);
            }
            return;
        }
        if (selectedTagIds.includes(tagId)) {
            setSelectedTagIds(selectedTagIds.filter((x) => x !== tagId));
        } else {
            setSelectedTagIds([...selectedTagIds, tagId]);
        }
    };

    return (
        <div
            className='tag-picker'
            ref={ref}
        >
            <input
                className={['filter-input', open && 'hide-radius']
                    .filter(Boolean)
                    .join(' ')}
                type='text'
                value={searchTerm}
                onFocus={() => setOpen(true)}
                onChange={(e) => onSearchTermChange(e)}
            />
            {open && (
                <div className='tag-list'>
                    {tags
                        .filter((x) =>
                            x.name
                                .toLowerCase()
                                .includes(searchTerm.toLowerCase())
                        )
                        .map((tag) => (
                            <Tag
                                key={tag.id}
                                colorHex={tag.color_hex}
                                text={tag.name}
                                state={
                                    selectedTagIds.includes(tag.id)
                                        ? TagStateEnum.Active
                                        : TagStateEnum.None
                                }
                                onClick={() => handleTagClick(tag.id)}
                            />
                        ))}
                </div>
            )}
        </div>
    );
}
