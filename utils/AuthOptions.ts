import type { NextAuthOptions, User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    providers: [
        CredentialsProvider({
            name: 'Sign in',
            credentials: {
                username: {
                    label: 'Username',
                    type: 'string',
                },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    const users: Credetials[] = [
                        {
                            id: '1',
                            username: 'uszaty',
                            password: 'ucho',
                        },
                        {
                            id: '2',
                            username: 'hello',
                            password: 'world',
                        },
                    ];

                    const cred = users.find(
                        (u) =>
                            u.username === credentials?.username &&
                            u.password === credentials.password
                    );

                    if (!cred) return null;

                    const user: User & { create: boolean } = {
                        id: cred.id,
                        name: cred?.username,
                        create: cred?.username !== 'hello',
                    };

                    return user;
                } catch (e) {
                    return null;
                }
            },
        }),
    ],
};

interface Credetials {
    id: string;
    username: string;
    password: string;
}
