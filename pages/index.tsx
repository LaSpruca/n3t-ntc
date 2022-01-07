import { GetStaticProps, NextPage } from 'next';
import {
    useState,
    EventHandler,
    ChangeEvent,
    MouseEventHandler,
    useContext,
} from 'react';
import AuthContext from '$components/contexts/AuthContext';
import { useRouter } from 'next/router';
import styles from '../styles/pages/Index.module.scss';
import { Notify } from 'notiflix';
import TrafficApiError from '$lib/api/TrafficApiError';

interface Props {
    apiUrl: string;
}

export const getStaticProps: GetStaticProps = async () => {
    return {
        props: {
            apiUrl: process.env.API_URL ?? '',
        },
    };
};

/**
 * Page where the user can log into the application
 * @constructor
 */
export const Index: NextPage<Props> = ({ apiUrl }: Props) => {
    // Stores for username and password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Get the login function from the auth context
    const { login: ctxLogin, setApiUrl } = useContext(AuthContext);
    setApiUrl(apiUrl);

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
        if (username === '' && password === '') {
            Notify.failure('Please fill in username and password');
            return;
        }

        try {
            await ctxLogin(username, password);
            await router.push('/map');
        } catch (e) {
            if (e instanceof TrafficApiError) {
                Notify.failure(e.message);
            }
        }
    };

    return (
        <div className={styles.loginWrapper}>
            <div className={styles.login}>
                <h1>N3T - NT</h1>
                <h2>Login</h2>
                <div className={styles.login__fields}>
                    <div
                        className={`${styles.login__field} ${
                            username !== '' ? styles.login__fieldText : ''
                        }`}
                    >
                        <input
                            type="text"
                            name="username"
                            onChange={updateUsername}
                        />
                        <label htmlFor="username">Username</label>
                    </div>

                    <div
                        className={`${styles.login__field} ${
                            password !== '' ? styles.login__fieldText : ''
                        }`}
                    >
                        <input
                            type="password"
                            name="password"
                            onChange={updatePassword}
                        />
                        <label htmlFor="password">Password</label>
                    </div>

                    <button className={styles.login__button} onClick={login}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Index;
