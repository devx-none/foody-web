import { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { apolloClient } from '@/graphql/apolloClient';
import { ApolloProvider } from '@apollo/client';

// Auth and roles
import { PersistLogin } from './auth/PersistLogin';
import { RequireAuth } from './auth/RequireAuth';
import { Roles } from './constants';
import AuthContext from '@/context/AuthProvider';

// Pages
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Unauthorized from '@/pages/Unauthorized';
import NotFound from '@/pages/NotFound';
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import Menus from '@/pages/Menus';
import Users from '@/pages/Users';
import Orders from '@/pages/Orders';

function Router() {
  const { auth } = useContext(AuthContext);
  const client = apolloClient(auth?.token);
  return (
    <ApolloProvider client={client}>
      <Routes>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        {/* private routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[Roles.ADMIN]} />}>
            <Route path="/" element={<Home />} />
            <Route path="products/*" element={<Products />} />
            <Route path="menus/*" element={<Menus />} />
            <Route path="users/*" element={<Users />} />
            <Route path="orders/*" element={<Orders />} />
          </Route>
        </Route>
        {/* not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </ApolloProvider>
  );
}

export default Router;
