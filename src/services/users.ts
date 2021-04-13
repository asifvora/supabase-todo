import { post } from 'services';

export const saveUsersApi = (params: any) => {
  return post({ subUrl: 'users', data: params });
};
