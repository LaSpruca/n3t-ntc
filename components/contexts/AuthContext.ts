import { createContext, useContext, useState } from 'react';
import useSessionStorage from '$lib/hooks/useSessionStorage';
import TrafficApiError from '$lib/api/TrafficApiError';
import AuthenticationResponseType from '$lib/api/auth/AuthenticationResponseType';

interface StoredAuthState {
    accessToken?: string;
    identity?: string;
    sessionToken?: string;
}

interface PrivilegedRequest {
    method: string;
    params: Record<string, string>;
    url: string;
}

export interface AuthState extends StoredAuthState {
    apiUrl: string;
    setApiUrl: (url: string) => void;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    fetchPrivileged: (req: PrivilegedRequest) => Promise<Response>;
}

export const useAuthContext = () => {
    const [storedAuth, setStoredAuth] = useSessionStorage<StoredAuthState>(
        'authState',
        {}
    );

    let apiUrl = '';
    const setApiUrl = (url: string) => (apiUrl = url);

    const login = async (username: string, password: string) => {
        const endpointUrl = `${apiUrl}/signIn?username=${username}&password=${password}`;

        let jsonRes: any;

        try {
            const res = await fetch(endpointUrl, {
                method: 'GET',
            });

            if (res.status === 200) {
                jsonRes = await res.json();
            } else {
                setStoredAuth({
                    identity: undefined,
                    accessToken: undefined,
                    sessionToken: undefined,
                });

                throw new TrafficApiError(
                    'Error authenticating',
                    res.status,
                    await res.json()
                );
            }
        } catch (ex) {
            throw ex;
        }

        if ('AuthenticationResponseType' in jsonRes) {
            switch (jsonRes['AuthenticationResponseType']) {
                case AuthenticationResponseType.Success:
                    {
                        if (!('AccessToken' in jsonRes)) {
                            throw new TrafficApiError(
                                'The API returned an invalid response',
                                100,
                                "Missing property 'AccessToken'"
                            );
                        } else if (!('Identity' in jsonRes)) {
                            throw new TrafficApiError(
                                'The API returned an invalid response',
                                101,
                                "Missing property 'Identity'"
                            );
                        }

                        setStoredAuth({
                            ...storedAuth,
                            accessToken: jsonRes['AccessToken'],
                            identity: jsonRes['Identity'],
                        });
                    }
                    break;

                case AuthenticationResponseType.NewPasswordChallenge:
                    {
                        if (!('SessionToken' in jsonRes)) {
                            throw new TrafficApiError(
                                'The API returned an invalid response',
                                102,
                                "Missing property 'SessionToken'"
                            );
                        }

                        setStoredAuth({
                            ...storedAuth,
                            sessionToken: jsonRes['SessionToken'],
                        });
                    }
                    break;

                default:
                    throw new TrafficApiError(
                        'Invalid response from API',
                        200,
                        'Invalid response type'
                    );
            }
        } else {
            throw new TrafficApiError(
                'The API returned an invalid response',
                101,
                "missing property 'AuthenticationResponseType'"
            );
        }
    };

    const logout = () => {
        setStoredAuth({
            ...storedAuth,
            sessionToken: undefined,
            accessToken: undefined,
            identity: undefined,
        });
    };

    const fetchPrivileged = async ({
        url,
        method,
        params,
    }: PrivilegedRequest) =>
        fetch(
            apiUrl +
                url +
                '?' +
                Object.keys(params)
                    .map((x) => `${x}=${params[x]}`)
                    .join('&') +
                `&AccessToken=${storedAuth.accessToken}&Identity=${storedAuth.identity}`,
            {
                method,
            }
        );
    return {
        ...storedAuth,
        login,
        logout,
        setApiUrl,
        apiUrl,
        fetchPrivileged,
    };
};

const AuthContext = createContext<AuthState>({
    logout: () => {},
    login: async (_username, _password) => {},
    apiUrl: '',
    setApiUrl: (_) => {},
    fetchPrivileged: async (_) => {
        throw new TrafficApiError('Not authenticated', 103);
    },
});

AuthContext.displayName = 'AuthContext';

export default AuthContext;
