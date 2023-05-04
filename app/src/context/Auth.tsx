
import React, { createContext, useContext, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface IUser {
  id: number;
  name: string;
  email: string;
}

interface IAuthContextType {
  user: IUser | null;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

interface ILocationState {
  from: Location | undefined;
}

interface INavigateTo {
  pathname: string;
  state?: ILocationState;
}

const AuthContext = createContext<IAuthContextType | null>(null);

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (authContext == null) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const RequireAuth = () => {
  const { user } = useAuth();
  const location = useLocation();

  if (user == null) {
    return (
      <Navigate
        to={{ pathname: "/unauthorized", state: { from: location } } as unknown as INavigateTo }
        replace
      />
    );
  }

  return <Outlet />;
};
