'use client';

import Image from 'next/image';

import './Header.scss';
import AddIcon from './assets/add.svg';
import UserIcon from './assets/user.svg';
import TagPicker from '../TagPIcker/TagPicker';

export default function Header() {
    const createTag = async () => {};

    return (
        <div className='header'>
            <button onClick={createTag}>
                <Image
                    src={AddIcon}
                    height={32}
                    width={32}
                    alt='Add new link'
                />
            </button>
            <TagPicker />
            <button>
                <Image
                    src={UserIcon}
                    height={32}
                    width={32}
                    alt='Add new link'
                />
            </button>
        </div>
    );
}
