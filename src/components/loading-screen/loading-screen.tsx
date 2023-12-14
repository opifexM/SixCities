import {useAppSelector} from '../../hooks';
import {getIsLoading} from '../../store/api-communication/api-communication.selectors.ts';
import {getIsAuthLoading} from '../../store/user-preferences/user-preferences.selectors.ts';
import styles from './loading-screen.module.css';

function LoadingScreen() {
  const isLoading = useAppSelector(getIsLoading);
  const isAuthLoading = useAppSelector(getIsAuthLoading);

  return isLoading || isAuthLoading ? (
    <div className={styles.loadingOverlay}>
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>Loading...</p>
      </div>
    </div>
  ) : null;
}

export default LoadingScreen;
