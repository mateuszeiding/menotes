import Image from 'next/image';

import './Header.scss';
import AddIcon from './assets/add.svg';
import UserIcon from './assets/user.svg';

export default function Header() {
    return (
        <div className='header'>
            <button>
                <Image
                    src={AddIcon}
                    height={32}
                    width={32}
                    alt='Add new link'
                />
            </button>
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
