import Image from 'next/image';
import { ButtonHTMLAttributes } from 'react';
import AddIcon from '../../assets/add.svg';

export default function CreateButton({
    onClick,
    text,
}: ButtonHTMLAttributes<HTMLButtonElement> & { text: string }) {
    return (
        <button
            onClick={onClick}
            className='btn'
        >
            <Image
                src={AddIcon}
                height={20}
                width={20}
                alt='Add new link'
            />
            {text}
        </button>
    );
}
