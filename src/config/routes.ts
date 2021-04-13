import { createBrowserHistory } from 'history';

import { routes as routes_config, IRoutesConfig } from 'config/routes_config';
import { HomePage } from 'pages/HomePage';

export const history = createBrowserHistory();

export const routes: IRoutesConfig = {
  [routes_config.index.id]: {
    ...routes_config.index,
    component: HomePage
  }
};
