import React, { useContext, useRef, useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { TransitionGroup, Transition } from 'react-transition-group';
import { rootContext } from 'stores';
import { supabase } from 'config/supabase';
import { TodoForm, IValues } from 'components/TodoForm';
import { Todo } from 'components/Todo';
import { Spinner } from 'components/Spinner';
import { Footer } from 'components/Footer';
import { images } from 'config/images';
import styles from 'styles/styles';

export const HomeContainer: React.FC = observer(() => {
  const menuTabRef = useRef(null);
  const [positionRatio, setPositionRatio] = useState(0);
  const [filter, setFilter] = useState('ALL');

  const {
    UsersStore: { state, onSaveTodo, getTodos }
  } = useContext(rootContext);

  const applyFilter = {
    ALL: todo => todo,
    ACTIVE: todo => !todo.done,
    DONE: todo => todo.done
  };

  const {
    ui: { isLoading },
    data: { todos }
  } = state;
  const todosData = toJS(todos);

  useEffect(() => {
    // Listen to * event
    const subscription = supabase
      .from('todos')
      .on('*', payload => {
        console.log('New Payload received!', payload);
      })
      .subscribe();

    return () => {
      if (subscription) supabase.removeSubscription(subscription);
    };
  }, []);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  const onSubmit = (params: Partial<IValues>) => {
    onSaveTodo(params);
  };

  const onFilter = e => {
    const ratio = menuTabRef.current.offsetWidth / 3;
    const currentPosition = parseInt(e.currentTarget.dataset.idx, 10);
    const positionRatio = (ratio + ratio / 2 - 25) * currentPosition;
    setPositionRatio(positionRatio);
    setFilter(e.currentTarget.dataset.filter);
  };

  return (
    <section {...styles.container}>
      <header>
        <h1>To-Do</h1>
      </header>
      <TodoForm isLoading={isLoading} onSubmit={onSubmit} />
      <nav {...styles.filter} ref={menuTabRef}>
        <figure onClick={onFilter} data-filter="ALL" data-idx="0">
          <img src={images.list} alt="list all" />
        </figure>
        <figure onClick={onFilter} data-filter="ACTIVE" data-idx="1">
          <img src={images.schedule} alt="todo" />
        </figure>
        <figure onClick={onFilter} data-filter="DONE" data-idx="2">
          <img src={images.check} alt="done" />
        </figure>
        <div {...styles.activeFilter(positionRatio)} />
      </nav>
      <main>
        {isLoading ? (
          <Spinner />
        ) : (
          <TransitionGroup {...styles.list} component="ul">
            {todosData
              .filter(applyFilter[filter])
              .reverse()
              .map(todo => (
                <Transition
                  key={todo.id}
                  timeout={750}
                  // onEnter={node => node.classList.add(styles.enter)}
                  // onEntered={node => node.classList.remove(styles.enter)}
                  // onExit={styles.onExit}
                >
                  <li>
                    <Todo {...todo} />
                  </li>
                </Transition>
              ))}
          </TransitionGroup>
        )}
      </main>
      <Footer />
    </section>
  );
});
