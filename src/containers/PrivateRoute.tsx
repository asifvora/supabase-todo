import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Redirect, Route } from 'react-router-dom';

import { rootContext } from 'stores';
import { routes } from 'config/routes_config';

export const PrivateRoute: React.FC = observer(props => {
  const {
    AuthStore: { state }
  } = useContext(rootContext);

  useEffect(() => {
    // do something here for async check
  }, []);

  if (state?.data?.token) {
    return <Route {...props} />;
  }

  return <Redirect to={routes.index.path} />;
});
