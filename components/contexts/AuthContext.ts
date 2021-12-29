import { createContext } from 'react';

export interface AuthState {
    loggedIn: boolean;
    login: () => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthState>({
    loggedIn: false,
    login: () => {},
    logout: () => {},
});

AuthContext.displayName = 'AuthContext';
