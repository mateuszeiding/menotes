import { ILinkDto } from '@/Models/LinkDto';
import { ITagDto } from '@/Models/TagDto';
import Tag from '@/components/Tag/Tag';
import { TagStateEnum } from '@/components/Tag/TagStateEnum';
import './LinkCard.scss';
import { useEffect, useState } from 'react';
import UpsertLink from '../Header/components/UpsertLink/UpsertLink';
import { useClickAway } from '@uidotdev/usehooks';
import { createPortal } from 'react-dom';

export default function LinkCard({
    id,
    name,
    href,
    tags,
    userName,
}: ILinkDto & { userName: string }) {
    const [edit, setEdit] = useState(false);
    const linkRef = useClickAway<HTMLDivElement>(() => {
        setEdit(false);
    });

    useEffect(() => {
        document.addEventListener('closeUpsertLink', () => setEdit(false));

        return () => {
            document.removeEventListener('closeUpsertLink', () =>
                setEdit(false)
            );
        };
    }, []);

    const editLink = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setEdit((prev) => !prev);
    };

    return (
        <a
            className={['link', edit && 'link-scale-prevent']
                .filter(Boolean)
                .join(' ')}
            href={href}
            target='_blank'
        >
            <div className='link-heading'>
                <span className='link-username'>{userName}</span>
                <button
                    className='btn btn-small'
                    onClick={(e: React.MouseEvent) => editLink(e)}
                >
                    Edit
                </button>
                {edit &&
                    createPortal(
                        <div className='overlay'>
                            <UpsertLink
                                edit={true}
                                {...{ id, name, href, tags }}
                                ref={linkRef}
                            />
                        </div>,
                        document.body
                    )}
            </div>
            <div>{name}</div>
            <div className='tags'>
                {tags &&
                    tags.map((tag: ITagDto) => (
                        <Tag
                            text={tag.name}
                            colorHex={tag.color_hex}
                            key={tag.id}
                            state={TagStateEnum.None}
                        />
                    ))}
            </div>
        </a>
    );
}
