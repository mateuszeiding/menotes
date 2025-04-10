'use client';

import Image from 'next/image';

import './Header.scss';
import UserIcon from './assets/user.svg';
import TagPicker from '../TagPIcker/TagPicker';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';
import UpsertLink from './components/UpsertLink/UpsertLink';
import { useClickAway } from '@uidotdev/usehooks';
import CreateButton from './components/CreateButton/CreateButton';
import CreateTag from './components/CreateTag/CreateTag';
import { LinkDto } from '@/Models/LinkDto';
import { createPortal } from 'react-dom';

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
        document.addEventListener('closeUpsertLink', () =>
            setShowCreateLink(false)
        );
        document.addEventListener('closeCreateTag', () =>
            setShowCreateTag(false)
        );

        return () => {
            document.removeEventListener('closeUpsertLink', () =>
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
                        <CreateButton
                            onClick={() => {
                                setShowCreateTag(false);
                                setShowCreateLink((prev) => !prev);
                            }}
                            text='Link'
                        />
                        {showCreateLink &&
                            createPortal(
                                <div className='overlay'>
                                    <UpsertLink
                                        edit={false}
                                        {...new LinkDto({})}
                                        ref={linkRef}
                                    />
                                </div>,
                                document.body
                            )}
                        <CreateButton
                            onClick={() => {
                                setShowCreateLink(false);
                                setShowCreateTag((prev) => !prev);
                            }}
                            text='Tag'
                        />
                        {showCreateTag &&
                            createPortal(
                                <div className='overlay'>
                                    <CreateTag ref={tagRef} />
                                </div>,
                                document.body
                            )}
                    </div>
                    <TagPicker className='justify-self-center' />
                </>
            )}
            <div className='header-config'>
                <button
                    className='btn'
                    onClick={session ? () => signOut() : () => signIn()}
                >
                    <Image
                        src={UserIcon}
                        height={24}
                        width={24}
                        alt='Account'
                    />
                </button>
            </div>
        </div>
    );
}
