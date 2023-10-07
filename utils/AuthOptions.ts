import type { NextAuthOptions } from 'next-auth';
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
                    const chekcCredentials = (
                        credentials:
                            | Record<'username' | 'password', string>
                            | undefined
                    ) =>
                        credentials?.username === 'uszaty' &&
                        credentials.password === 'ucho';

                    const user = {
                        id: '1',
                        name: 'Mateusz Eiding',
                        username: 'Uszaty',
                    };
                    if (chekcCredentials(credentials)) {
                        return user;
                    }
                    return null;
                } catch (e) {
                    return null;
                }
            },
        }),
    ],
};
