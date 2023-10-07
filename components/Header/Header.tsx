'use client';

import Image from 'next/image';

import './Header.scss';
import AddIcon from './assets/add.svg';
import UserIcon from './assets/user.svg';
import TagPicker from '../TagPIcker/TagPicker';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useState } from 'react';
import CreateLink from '../CreateLink/CreateLink';
import { useClickAway } from '@uidotdev/usehooks';

export default function Header() {
    const { data: session } = useSession();
    const [showCreate, setShowCreate] = useState(false);
    const ref = useClickAway<HTMLDivElement>(() => {
        setShowCreate(false);
    });
    return (
        <div
            className={['header', !session && 'header-unauthorized']
                .filter(Boolean)
                .join(' ')}
        >
            {session && (
                <>
                    <button
                        onClick={() => setShowCreate((prev) => !prev)}
                        disabled={!session}
                    >
                        <Image
                            src={AddIcon}
                            height={32}
                            width={32}
                            alt='Add new link'
                        />
                    </button>
                    {showCreate && (
                        <div ref={ref}>
                            <CreateLink />
                        </div>
                    )}
                    <TagPicker />
                </>
            )}
            <button onClick={session ? () => signOut() : () => signIn()}>
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
