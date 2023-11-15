import { ChangeEvent, useContext, useEffect, useState } from 'react';

import Tag from '@/components/Tag/Tag';
import { TagStateEnum } from '@/components/Tag/TagStateEnum';
import { TagsContext } from '@/context/useTagContext';
import { useClickAway } from '@uidotdev/usehooks';
import './TagPicker.scss';

interface ITagPicker {
    selectedTagIdsCallback?: (tagIds: number[]) => void;
    initialTagIds?: number[];
    className?: string;
}

export default function TagPicker({
    selectedTagIdsCallback,
    initialTagIds,
    className,
}: ITagPicker) {
    const [searchTerm, setSearchTerm] = useState('');
    const [open, setOpen] = useState(false);
    const [selectedTagIdsOut, setSelectedTagIdsOut] = useState<number[]>(
        initialTagIds ?? []
    );

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
            const selected = selectedTagIdsOut.includes(tagId)
                ? selectedTagIdsOut.filter((x) => x !== tagId)
                : [...selectedTagIdsOut, tagId];
            setSelectedTagIdsOut(selected);
            selectedTagIdsCallback(selected);
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
            className={['tag-picker', className].filter(Boolean).join(' ')}
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
                placeholder='Search for tags'
            />
            <div
                className={['tag-list', open && 'show']
                    .filter(Boolean)
                    .join(' ')}
            >
                <div className='tag-list-container'>
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
                                    selectedTagIds.includes(tag.id) ||
                                    selectedTagIdsOut.includes(tag.id)
                                        ? TagStateEnum.Active
                                        : TagStateEnum.None
                                }
                                onClick={() => handleTagClick(tag.id)}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}
