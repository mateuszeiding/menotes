'use client';

import Image from 'next/image';

import './Header.scss';
import UserIcon from './assets/user.svg';
import TagPicker from '../TagPIcker/TagPicker';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import CreateLink from './components/CreateLink/CreateLink';
import { useClickAway } from '@uidotdev/usehooks';
import CreateButton from './components/CreateButton/CreateButton';

export default function Header() {
    const { data: session } = useSession();
    const [showCreateLink, setShowCreateLink] = useState(false);
    const ref = useClickAway<HTMLDivElement>(() => {
        setShowCreateLink(false);
    });

    useEffect(() => {
        document.addEventListener('closeCreate', () =>
            setShowCreateLink(false)
        );

        return () =>
            document.removeEventListener('closeCreate', () =>
                setShowCreateLink(false)
            );
    }, []);

    return (
        <div
            className={['header', !session && 'header-unauthorized']
                .filter(Boolean)
                .join(' ')}
        >
            {session && (
                <>
                    <div className='header-add-buttons'>
                        {session.user?.name !== 'hello' && (
                            <CreateButton
                                onClick={() =>
                                    setShowCreateLink((prev) => !prev)
                                }
                                text='Link'
                            />
                        )}
                        {showCreateLink && <CreateLink ref={ref} />}
                        {session.user?.name !== 'hello' && (
                            <CreateButton
                                onClick={() =>
                                    setShowCreateLink((prev) => !prev)
                                }
                                text='Tag'
                            />
                        )}
                        {showCreateLink && <CreateLink ref={ref} />}
                    </div>
                    <TagPicker />
                </>
            )}
            <button onClick={session ? () => signOut() : () => signIn()}>
                <Image
                    src={UserIcon}
                    height={24}
                    width={24}
                    alt='Account'
                />
            </button>
        </div>
    );
}
