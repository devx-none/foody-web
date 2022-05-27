// @ts-nocheck
import AuthContext from '@/context/AuthProvider';
import { useRefreshMutation } from '@/graphql/generated/graphql';
import { useContext } from 'react';
import { useAuth } from './useAuth';

export const useRefreshToken = () => {
  // const { setAuth } = useAuth();
  const { setAuth } = useContext(AuthContext);

  const [refreshMutation] = useRefreshMutation();

  const refreshToken = async () => {
    const response = await refreshMutation();
    setAuth({
      role: response?.data?.refresh.role,
      token: response?.data?.refresh.token,
    });
    return response?.data?.refresh.token;
  };
  return refreshToken;
};

export default useRefreshToken;
