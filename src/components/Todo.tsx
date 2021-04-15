import React from 'react';
import { css } from 'glamor';
import { images } from 'config/images';
import { Checkmark } from 'components/Checkmark';
import { supabase } from 'config/supabase';

const styles = {
  container: css({
    display: 'flex',
    justifyItems: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'rgba(0,0,0,0.2)',
    borderRadius: '5px',
    '& img': {
      opacity: 0.8,
      pointerEvents: 'none'
    },
    ':hover': {
      '& img': {
        opacity: 1,
        pointerEvents: 'initial'
      }
    },
    '& div': {
      margin: '10px'
    },
    '& input, & span': {
      color: '#ffffff',
      background: 'transparent',
      border: 'none',
      width: '100%',
      padding: '.8rem 1.0rem',
      textAlign: 'left'
    },
    '& input:focus': {
      outline: 'none',
      caretColor: '#0cc10c'
    }
  }),
  content: done =>
    css({
      position: 'relative',
      opacity: done ? 0.5 : 1,
      width: '100%',
      textAlign: 'left',
      ':after': {
        content: '""',
        position: 'absolute',
        display: 'block',
        width: '100%',
        height: '2px',
        top: '48%',
        borderRadius: '1px',
        background: '#cb3066',
        transformOrigin: done ? 'center left' : 'center right',
        transform: done ? 'scaleX(1)' : 'scaleX(0)',
        transition: 'transform 0.5s cubic-bezier(0.55, 0, 0.1, 1)'
      }
    }),
  delete: css({
    cursor: 'pointer',
    alignSelf: 'end'
  })
};

export type IProps = {
  id: number;
  note: string;
  done: boolean;
  createdAt: any;
};

export const Todo: React.FC<IProps | any> = props => {
  const { id, note, done } = props;

  const toggle = async () => {
    try {
      await supabase
        .from('todos')
        .update({ done: !done })
        .eq('id', id)
        .single();
    } catch (error) {
      console.log('error', error);
    }
  };

  const deleteTodo = async () => {
    try {
      await supabase
        .from('todos')
        .delete()
        .eq('id', id);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <article {...styles.container}>
      <div onClick={toggle}>
        <Checkmark checked={done} />
      </div>
      <div {...styles.content(done)}>{note}</div>
      <div>
        <img src={images.delete} alt="delete" onClick={deleteTodo} />
      </div>
    </article>
  );
};
