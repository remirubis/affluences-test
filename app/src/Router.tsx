import React from "react";
import { Navigate, useRoutes } from "react-router-dom";

import { DefaultLayout } from "./ui/layout";
import { Home, NotFound, UnAuthorized } from "./ui/pages";

const Router = () => {
  const mainRoutes = [
    {
      path: "/",
      element: <DefaultLayout />,
      children: [
        { path: "", element: <Home /> },
        // { path: 'login', element: <Login /> },
        // { path: 'reset-password', element: <ResetPassword /> },
        // { path: 'register', element: <Register /> },
        { path: "notfound", element: <NotFound /> },
        { path: "unauthorized", element: <UnAuthorized /> },
      ],
    },
    // {
    //   path: '/',
    //   element: (
    //     <RequireAuth>
    //       <ConnectedLayout />
    //     </RequireAuth>
    //   ),
    //   children: [
    //     { path: '', element: <ConnectedPages /> },
    //   ],
    // },
    { path: "*", element: <Navigate to="/notfound" replace /> },
  ];

  return useRoutes(mainRoutes);
};

export default Router;
