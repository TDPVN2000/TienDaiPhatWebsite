import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

import { postLogin } from 'api/auth';
import { history } from 'App';
import { CookieKey } from 'constants/enum';
import cookie from './cookie';

export const useAuth = () => {
  const navigate = useNavigate();

  const { mutate: login, isLoading: loadingLogin } = useMutation(
    (payload: any) => postLogin(payload),
    {
      onSuccess: (data: any) => {
        const token = data?.token;
        const refreshToken = data?.refreshToken;
        if (token && refreshToken) {
          cookie.setItem(CookieKey.TOKEN, token);
          cookie.setItem(CookieKey.REFRESH_TOKEN, refreshToken);
        }
        navigate('/');
      },
    }
  );
  const logout = () => {
    cookie.removeItem(CookieKey.TOKEN);
    cookie.removeItem(CookieKey.REFRESH_TOKEN);
    history.replace('/login');
  };

  return { login, logout, loadingLogin };
};
