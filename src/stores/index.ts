import { createContext } from 'react';
import { observable } from 'mobx';
import remotedev from 'mobx-remotedev';
import { AppStore } from './app';
import { TodosStore } from './todos';
import { AuthStore } from './auth';

export class RootStore {
  AppStore: AppStore;
  TodosStore: TodosStore;
  AuthStore: AuthStore;

  @observable version = 1;

  constructor() {
    this.AppStore = new AppStore(this);
    this.TodosStore = new TodosStore(this);
    this.AuthStore = new AuthStore(this);
  }
}

export const rootStore = (() => {
  const store = remotedev(RootStore, {
    global: true,
    onlyActions: true,
    name: 'app-mobx-store'
  });
  return new store();
})();

export const rootContext = createContext(rootStore);
