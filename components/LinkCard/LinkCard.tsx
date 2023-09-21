import { ILinkDto } from '@/Models/LinkDto';
import { ITagDto } from '@/Models/TagDto';
import Tag from '@/components/Tag/Tag';
import { TagStateEnum } from '@/components/Tag/TagStateEnum';
import './LinkCard.scss';

export default function LinkCard({ name, href, tags }: Omit<ILinkDto, 'id'>) {
    return (
        <a
            className='link'
            href={href}
        >
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
