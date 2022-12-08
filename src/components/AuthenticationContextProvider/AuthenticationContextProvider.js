import React, { useState, useMemo, useCallback, useContext } from 'react';
import { AuthenticationContext } from './AuthenticationContext';
import { checkAuthenticate } from '../../utilis/checkAuthenticate';
import { CartContext } from '../CartContextProvider/CartContext';

const AuthenticationContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { setCart } = useContext(CartContext);

  const authenticate = useCallback((data) => {
    setUser(data);
    const loginToken = 'EDnrQ(vG}!7&*]P';
    document.cookie = `loginToken=${loginToken}`;
    // const token = jwt.sign({ id: data.id }, "secret")

    // jwt.sing... // TODO: if time allows use jwt package to generate a token https://www.npmjs.com/package/jsonwebtoken
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setCart([]);
    document.cookie = 'loginToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  }, [setCart]);

  const isAuthenticated = checkAuthenticate() && user;

  const userValue = useMemo(() => ({ user, authenticate, logout, isAuthenticated }), [user, authenticate, logout, isAuthenticated]);

  return <AuthenticationContext.Provider value={userValue}>{children}</AuthenticationContext.Provider>;
};

export { AuthenticationContextProvider };