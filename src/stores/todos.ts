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

export class TodosStore {
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
      const { error, data } = await supabase.from('todos').insert([{ note }]);
      if (!error) {
        const {
          data: { todos }
        } = this.state;
        this.setState({
          data: {
            todos: [...todos, ...data]
          }
        });
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

  onToggleTodo = async (params: { id: number; done: boolean }) => {
    const { id, done } = params;
    try {
      const { error, data: response } = await supabase
        .from('todos')
        .update({ done: !done })
        .eq('id', id)
        .single();
      if (!error) {
        const {
          data: { todos }
        } = this.state;
        const updatedTodos = todos.map(item => {
          if (item.id === id) {
            return response;
          } else {
            return item;
          }
        });
        this.setState({
          data: {
            todos: updatedTodos
          }
        });
      }
    } catch (error) {
      console.log({ error });
    }
  };

  onDeleteTodo = async (params: { id: number }) => {
    const { id } = params;
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);
      if (!error) {
        const {
          data: { todos }
        } = this.state;
        this.setState({
          data: {
            todos: todos.filter(todo => todo.id !== id) || []
          }
        });
      }
    } catch (error) {
      console.log({ error });
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
      const { data } = await supabase.from('todos').select('*');
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
