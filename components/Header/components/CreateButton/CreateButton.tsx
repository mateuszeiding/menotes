import Image from 'next/image';
import { ButtonHTMLAttributes } from 'react';
import AddIcon from '../../assets/add.svg';
import './CreateButton.scss';

export default function CreateButton({
    onClick,
    text,
}: ButtonHTMLAttributes<HTMLButtonElement> & { text: string }) {
    return (
        <button
            onClick={onClick}
            className='create-button'
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
