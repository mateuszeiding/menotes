import { TagStateEnum } from './TagStateEnum';
import Check from '@/assets/icons/check.svg';
import Close from '@/assets/icons/close.svg';
import './Tag.scss';
import Image from 'next/image';

interface ITag {
    text: string;
    colorHex: string;
    state?: TagStateEnum;
    onClick?: () => void;
}

export default function Tag({ text, colorHex, state, onClick }: ITag) {
    return (
        <button
            onClick={onClick}
            className={['tag'].filter(Boolean).join(' ')}
            style={{
                backgroundColor: colorHex,
                boxShadow:
                    state != TagStateEnum.None
                        ? 'inset 0px 0px 0px 1px rgba(0, 0, 0, 0.4)'
                        : 'none',
            }}
        >
            {text}
            {state == TagStateEnum.Active && (
                <Image
                    className='tag-icon'
                    src={Check}
                    height={8}
                    width={8}
                    alt='Add new link'
                />
            )}
            {state == TagStateEnum.Selected && (
                <Image
                    className='tag-icon'
                    src={Close}
                    height={8}
                    width={8}
                    alt='Add new link'
                />
            )}
        </button>
    );
}
