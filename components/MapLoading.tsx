import Loop from '@mui/icons-material/Loop';
import styles from '../styles/components/MapLoading.module.scss';

const MapLoading = () => (
    <div className={styles.loadingDisplay}>
        <Loop className={styles.loading} />
        <h1>Loading Map</h1>
    </div>
);

export default MapLoading;
