import { observable, action } from 'mobx';
import { RootStore } from 'stores';
import { supabase } from 'config/supabase';

export type IInitialState = {
  data: {
    todos: Array<any>;
  };
  ui: {
    isLoading: boolean;
    isFetching: boolean;
  };
};

export const initialState: IInitialState = {
  data: {
    todos: []
  },
  ui: {
    isLoading: false,
    isFetching: false
  }
};

export class UsersStore {
  @observable state: IInitialState = initialState;
  rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    /* use this space to hydrate state from localStorage */
  }

  onSaveTodo = async (params: any) => {
    const { note } = params;
    const { ui } = this.state;
    this.setState({
      ui: {
        ...ui,
        isLoading: true
      }
    });
    try {
      const { error } = await supabase.from('todos').insert([{ note }]);
      if (!error) {
        //do something
      }
    } catch (error) {
      console.log({ error });
    } finally {
      this.setState({
        ui: {
          ...ui,
          isLoading: false
        }
      });
    }
  };

  getTodos = async () => {
    const { ui } = this.state;
    this.setState({
      ui: {
        ...ui,
        isFetching: true
      }
    });
    try {
      const { data, error } = await supabase.from('todos').select('*');
      console.log({ error });
      this.setState({
        data: {
          todos: data || []
        }
      });
    } catch (error) {
      console.log({ error });
    } finally {
      this.setState({
        ui: {
          ...ui,
          isFetching: false
        }
      });
    }
  };

  @action
  setState = (params: Partial<IInitialState>) => {
    const { state } = this;
    this.state = {
      ...state,
      ...params
    };
    /* use this space to save/sync state with localStorage */
  };

  @action
  reset = () => {
    this.state = initialState;
    /* use this space to reset localStorage in case if you're persisting this state */
  };
}
