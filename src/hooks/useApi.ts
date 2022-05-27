import { useContext, useEffect } from 'react';
import api from '@/api/axios';
import { useRefreshToken } from './useRefreshToken';
import AuthContext from '@/context/AuthProvider';

export const useApi = () => {
  const refresh = useRefreshToken();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        if (config.headers && !config.headers.Authorization) {
          config.headers.Authorization = `Bearer ${auth?.token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return api(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return api;
};

// export default useApi;
