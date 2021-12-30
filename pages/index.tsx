import { NextPage } from 'next';
import {
    useState,
    EventHandler,
    ChangeEvent,
    useEffect,
    MouseEventHandler,
    useContext,
} from 'react';
import { AuthContext } from '$components/contexts/AuthContext';
import { useRouter } from 'next/router';
import { UI_PRIMARY } from '$lib/colors';

export const Index: NextPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login: authLogin } = useContext(AuthContext);
    const [{ error, isError }, setError] = useState({
        error: '',
        isError: false,
    });
    const router = useRouter();

    const updatePassword: EventHandler<ChangeEvent<HTMLInputElement>> = (
        event
    ) => {
        setPassword(event.target.value);
    };

    const updateUsername: EventHandler<ChangeEvent<HTMLInputElement>> = (
        event
    ) => {
        setUsername(event.target.value);
    };

    const login: MouseEventHandler<HTMLButtonElement> = async (event) => {
        // Dogy shit, when I get the real source code, this will be hardcodedn't
        if (username == 'demo' && password == 'D3mopass!') {
            authLogin();
            await router.push('/map');
        } else {
            setError({ error: 'Invalid username or password', isError: true });
        }
    };

    return (
        <>
            <style jsx>{`
                .login {
                    h1,
                    h2 {
                        text-align: center;
                        padding: 0.5rem;
                    }

                    &__error {
                        color: red;
                    }

                    &--wrapper {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        height: 100vh;
                    }

                    &__fields {
                        padding: 1rem;
                        display: flex;
                        gap: 2rem;
                        flex-direction: column;
                        align-items: center;
                    }

                    &__button {
                        width: fit-content;
                        font-size: 1rem;
                        padding: 1rem;

                        border: 1px solid ${UI_PRIMARY};
                        border-radius: 10px;
                        transition: outline 0.05s linear,
                            background-color 0.5s linear;

                        background-color: ${UI_PRIMARY};
                        color: white;

                        &:hover {
                            cursor: pointer;
                            background-color: #222;
                        }
                    }

                    &__field {
                        position: relative;

                        input {
                            padding: 1rem;
                            border: 1px solid ${UI_PRIMARY};
                            border-radius: 10px;
                            transition: outline 0.05s linear;

                            &:active,
                            &:focus {
                                outline: ${UI_PRIMARY} 2px solid;
                            }
                        }

                        label {
                            position: absolute;
                            padding: 0.5rem;
                            left: 50%;
                            top: 50%;
                            transform: translate(-50%, -60%);
                            pointer-events: none;
                            transition: transform 0.1s ease-in-out,
                                top 0.1s ease-in-out;
                        }

                        &:focus-within,
                        &--text {
                            label {
                                top: -1rem;
                                background-color: white;
                                transform: translateX(-50%);
                            }
                        }
                    }
                }
            `}</style>
            <div className="login--wrapper">
                <div className="login">
                    <h1>N3T - NT</h1>
                    <h2>Login</h2>
                    {isError ? (
                        <p className="login__error">Error: {error}</p>
                    ) : (
                        ''
                    )}
                    <div className="login__fields">
                        <div
                            className={
                                'login__field ' +
                                (username !== '' ? 'login__field--text' : '')
                            }
                        >
                            <input
                                type="text"
                                name="username"
                                onChange={updateUsername}
                            />
                            <label htmlFor="username">Username</label>
                        </div>

                        <div
                            className={
                                (password !== '' ? 'login__field--text ' : '') +
                                'login__field'
                            }
                        >
                            <input
                                type="password"
                                name="password"
                                onChange={updatePassword}
                            />
                            <label htmlFor="password">Password</label>
                        </div>

                        <button className="login__button" onClick={login}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Index;
