import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
// import { setContext } from '@apollo/client/link/context';
// import useAuth from '@/hooks/useAuth';

// const httpLink = createHttpLink({
//   uri: 'http://localhost:4000/graphql',
//   credentials: 'include',
// });

// const authLink = setContext((_, { headers }) => {
//   // const { auth } = useAuth();
//   return {
//     headers: {
//       ...headers,
//       authorization: auth?.token ? `Bearer ${auth?.token}` : '',
//     },
//   };
// });

export const apolloClient = (token: string | undefined) =>
  new ApolloClient({
    cache: new InMemoryCache(),
    // link: authLink.concat(httpLink),
    link: new HttpLink({
      uri: 'http://localhost:4000/graphql',
      credentials: 'include',
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    }),
  });
