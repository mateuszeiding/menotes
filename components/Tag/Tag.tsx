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
    function lightOrDarkFont(color: string) {
        const c = color.substring(1); // strip #
        const rgb = parseInt(c, 16); // convert rrggbb to decimal
        const r = (rgb >> 16) & 0xff; // extract red
        const g = (rgb >> 8) & 0xff; // extract green
        const b = (rgb >> 0) & 0xff; // extract blue

        const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
        if (luma < 120) {
            return 'text-light';
        } else {
            return 'text-dark';
        }
    }

    return (
        <button
            onClick={onClick}
            className={['tag', !onClick && 'disable-mouse']
                .filter(Boolean)
                .join(' ')}
            style={{
                backgroundColor: colorHex,
                boxShadow:
                    state != TagStateEnum.None
                        ? 'inset 0px 0px 0px 1px rgba(0, 0, 0, 0.4)'
                        : 'none',
            }}
        >
            <span className={lightOrDarkFont(colorHex)}>{text}</span>
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
