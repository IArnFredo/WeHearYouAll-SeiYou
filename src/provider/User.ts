import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";

// user from firebase
export interface Auth {
  loggedIn: Boolean;
  userId?: string;
  userData?: any;
}

interface AuthInit {
  auth?: Auth;
}

export const userContext = React.createContext<Auth>({ loggedIn: false });

export function useUser(): Auth {
  return React.useContext(userContext);
}

export function useUserInit(): AuthInit {
  const [userInit, setUserInit] = React.useState<AuthInit>({});
  const app = getAuth();
  useEffect(() => {
    return onAuthStateChanged(app, (user) => {
      const auth = user
        ? { loggedIn: true, userId: user.uid, userData: user }
        : { loggedIn: false };
      setUserInit({ auth });
    });
  },[]);
  return userInit;
}
