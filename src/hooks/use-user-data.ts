import {
  getAuthorizationStatus,
  getUserAvatarUrl,
  getUserLogin
} from '../store/user-preferences/user-preferences.selectors.ts';
import {useAppSelector} from './index.ts';

const useUserData = () => {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userLogin = useAppSelector(getUserLogin);
  const userAvatarUrl = useAppSelector(getUserAvatarUrl);

  return {
    authorizationStatus,
    userLogin,
    userAvatarUrl,
  };
};

export default useUserData;
