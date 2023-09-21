import Image from 'next/image';

import { TagStateEnum } from './TagStateEnum';
import Check from '@/assets/icons/check.svg';
import Close from '@/assets/icons/close.svg';
import './Tag.scss';

interface ITag {
    text: string;
    colorHex: string;
    state?: TagStateEnum;
}

export default function Tag({ text, colorHex, state }: ITag) {
    return (
        <span
            className={['tag'].filter(Boolean).join(' ')}
            style={{
                backgroundColor: colorHex,
                border:
                    state != TagStateEnum.None
                        ? '1px solid rgba(0, 0, 0, 0.4)'
                        : 'none',
            }}
        >
            {text}
            {state === TagStateEnum.Active && (
                <Check
                    height={8}
                    preserveAspectRatio='xMinYMin meet'
                />
            )}
            {state === TagStateEnum.Selected && (
                <Close
                    height={8}
                    preserveAspectRatio='xMinYMin meet'
                />
            )}
        </span>
    );
}
