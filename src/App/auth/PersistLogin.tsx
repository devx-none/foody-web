import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext, useRef } from 'react';
import AuthContext from '@/context/AuthProvider';
import { useRefreshMutation } from '@/graphql/generated/graphql';
import Layout from '../layout';
import { Spinner } from '@/components/Spinner';

export function PersistLogin() {
  const { auth, persist, setAuth } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const executedRef = useRef(false);
  const navigate = useNavigate();

  const [refreshMutation] = useRefreshMutation();

  const verifyRefreshToken = async () => {
    const response = await refreshMutation();
    if (response?.data?.refresh && response?.data?.refresh.__typename === 'Refresh') {
      console.log('refreshed!');
      setAuth({
        role: response?.data?.refresh.role,
        token: response?.data?.refresh.token,
      });
      setIsLoading(false);
    } else if (response?.data?.refresh && response?.data?.refresh.__typename === 'AuthError') {
      console.log(response?.data?.refresh.message);
      navigate('/login');
    }
  };
  // console.log('rendered');
  console.log(auth);
  // console.log(persist);

  useEffect(() => {
    // let isMounted = true;
    if (executedRef.current) {
      return;
    }

    !auth?.token ? verifyRefreshToken() : setIsLoading(false);
    // verifyRefreshToken();
    // return () => {
    // isMounted = false;
    // setIsLoading(true);
    // };
    executedRef.current = true;
  }, []);

  // useEffect(() => {
  //   console.log(`isLoading: ${isLoading}`);
  //   console.log(`AccessToken: ${auth?.token}`);
  // }, [isLoading, auth?.token]);

  return <>{persist === 'false' ? <Layout /> : isLoading ? <Spinner spinningColor='text-secondary-500' bgColor='fill-primary-500' size='24' classNames='grid place-content-center w-full h-screen' /> : <Layout />}</>;
  // return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
}
