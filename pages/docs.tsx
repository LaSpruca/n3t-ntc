import Link from 'next/link';

export const Docs = () => {
    return (
        <>
            <style jsx>{`
                span {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100vh;
                    max-height: 100%;
                    flex-direction: column;
                    text-align: center;
                    gap: 1rem;
                }

                a {
                    color: #444;
                    transition: color 200ms ease-out;

                    &:hover {
                        color: #777;
                    }
                }
            `}</style>
            <span>
                <h1>Nothing Here</h1>
                <p>
                    The original docs can be found at
                    <br />
                    <a href="blob:https://www.ntc.n3t.kiwi/63d3e1e5-3e19-4b67-b23e-cc512109c6aa">
                        blob:https://www.ntc.n3t.kiwi/63d3e1e5-3e19-4b67-b23e-cc512109c6aa
                    </a>
                </p>
            </span>
        </>
    );
};

export default Docs;
