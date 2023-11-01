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
import CreateTag from './components/CreateTag/CreateTag';

export default function Header() {
    const { data: session } = useSession();
    const [showCreateLink, setShowCreateLink] = useState(false);
    const [showCreateTag, setShowCreateTag] = useState(false);
    const linkRef = useClickAway<HTMLDivElement>(() => {
        setShowCreateLink(false);
    });
    const tagRef = useClickAway<HTMLDivElement>(() => {
        setShowCreateTag(false);
    });

    useEffect(() => {
        document.addEventListener('closeCreateLink', () =>
            setShowCreateLink(false)
        );
        document.addEventListener('closeCreateTag', () =>
            setShowCreateTag(false)
        );

        return () => {
            document.removeEventListener('closeCreateLink', () =>
                setShowCreateLink(false)
            );
            document.addEventListener('closeCreateTag', () =>
                setShowCreateTag(false)
            );
        };
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
                                onClick={() => {
                                    setShowCreateTag(false);
                                    setShowCreateLink((prev) => !prev);
                                }}
                                text='Link'
                            />
                        )}
                        {showCreateLink && <CreateLink ref={linkRef} />}
                        {session.user?.name !== 'hello' && (
                            <CreateButton
                                onClick={() => {
                                    setShowCreateLink(false);
                                    setShowCreateTag((prev) => !prev);
                                }}
                                text='Tag'
                            />
                        )}
                        {showCreateTag && <CreateTag ref={tagRef} />}
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
