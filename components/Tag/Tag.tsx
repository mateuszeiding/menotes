import { TagStateEnum } from './TagStateEnum';
import CheckDark from '@/assets/icons/check-dark.svg';
import CheckLight from '@/assets/icons/check-light.svg';
import CloseDark from '@/assets/icons/close-dark.svg';
import CloseLight from '@/assets/icons/close-light.svg';
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
        return luma < 120;
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
            <span
                className={
                    lightOrDarkFont(colorHex) ? 'text-light' : 'text-dark'
                }
            >
                {text}
            </span>
            {state == TagStateEnum.Active && (
                <Image
                    className='tag-icon'
                    src={lightOrDarkFont(colorHex) ? CheckLight : CheckDark}
                    height={8}
                    width={8}
                    alt='Add new link'
                />
            )}
            {state == TagStateEnum.Selected && (
                <Image
                    className='tag-icon'
                    src={lightOrDarkFont(colorHex) ? CloseLight : CloseDark}
                    height={8}
                    width={8}
                    alt='Add new link'
                />
            )}
        </button>
    );
}
