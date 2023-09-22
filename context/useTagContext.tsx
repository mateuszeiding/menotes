import { ITagDto } from '@/Models/TagDto';
import { IChildren } from '@/interfaces/IChildren';
import { createContext, useState } from 'react';

interface ITagsContext {
    tags: ITagDto[];
    setTags: (tags: ITagDto[]) => void;
    selectedTagIds: number[];
    setSelectedTagIds: (tags: number[]) => void;
}

const TagsContext = createContext<ITagsContext>({
    tags: [],
    setTags: () => [],
    selectedTagIds: [],
    setSelectedTagIds: () => [],
});

const TagsContextProvider = ({ children }: IChildren) => {
    const [tags, setTags] = useState<ITagDto[]>([]);
    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);

    return (
        <TagsContext.Provider
            value={{ tags, setTags, selectedTagIds, setSelectedTagIds }}
        >
            {children}
        </TagsContext.Provider>
    );
};

export { TagsContext, TagsContextProvider };
