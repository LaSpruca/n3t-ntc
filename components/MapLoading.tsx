import Loop from '@mui/icons-material/Loop';
const MapLoading = () => (
    <>
        <style jsx>{`
            .loading-display {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                height: 100vh;
                gap: 2rem;
            }

            :global(.loading) {
                width: 5rem;
                height: 5rem;
                animation: spin infinite 2s ease-in-out reverse;
            }

            @keyframes spin {
                0% {
                    transform: rotate(0deg);
                }

                50% {
                    transform: rotate(180deg);
                }

                100% {
                    transform: rotate(360deg);
                }
            }
        `}</style>
        <div className="loading-display">
            <Loop className="loading" />
            <h1>Loading Map</h1>
        </div>
    </>
);

export default MapLoading;
