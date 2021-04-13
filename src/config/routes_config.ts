import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export type IRoutesConfig = {
  [key: string]: {
    id: string;
    name: string;
    description?: string;
    path: string;
    path_string: (params: any) => string;
    exact: boolean;
    isPrivate: boolean;
    isStatic?: boolean;
    component?:
      | React.ComponentType<RouteComponentProps<any>>
      | React.ComponentType<any>;
  };
};
/**
 * @description the aim to create this config is to have
 *  a single source of truth for the routes defination.
 *  the reason we are not importing the components here
 *  for the property `component` is to avoid circular
 *  import dependencies error.
 *  components will be assigned in config/routes.ts
 */
export const routes: IRoutesConfig = {
  index: {
    id: 'index',
    name: 'Home',
    description: 'Home page',
    path: '/',
    path_string: () => {
      return `/`;
    },
    exact: true,
    isPrivate: false,
    isStatic: true,
    component: undefined
  }
};
