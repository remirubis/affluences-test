import './Default.layout.scss';

import React from 'react';
import { Outlet } from 'react-router-dom';

export const DefaultLayout = () => (
  <>
    <main>
      <Outlet />
    </main>
  </>
);