import styles from '../styles/pages/Docs.module.scss';

/**
 * The docs page, no content here yet
 * @constructor
 */
export const Docs = () => (
    <span className={styles.spanner}>
        <h1>Nothing Here</h1>
        <p>
            The original docs can be found at
            <br />
            <a href="blob:https://www.ntc.n3t.kiwi/63d3e1e5-3e19-4b67-b23e-cc512109c6aa">
                blob:https://www.ntc.n3t.kiwi/63d3e1e5-3e19-4b67-b23e-cc512109c6aa
            </a>
        </p>
    </span>
);

export default Docs;
