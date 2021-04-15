import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { css } from 'glamor';
import { validations } from 'common/validations';
import { images } from 'config/images';

const styles = {
  group: css({
    position: 'relative',
    boxSizing: 'border-box',
    '& input': {
      fontSize: '100%',
      marginBottom: '1.5rem',
      width: '100%',
      appearance: 'none',
      backgroundColor: '#6d6e70',
      border: 'none',
      borderRadius: '.4rem',
      boxShadow: 'none',
      boxSizing: 'inherit',
      height: '2.8rem',
      color: '#ffffff',
      caretColor: '#0cc10c',
      padding: '.6rem 1.0rem',
      transition: 'transform 0.4s',
      ':focus': {
        outline: 'none',
        transform: ''
      },
      '::placeholder': {
        color: '#a0a0a0'
      }
    }
  }),
  icon: css({
    position: 'absolute',
    right: '2%',
    top: '14%'
  }),
  clear: css({
    top: '18%'
  })
};

export type IProps = {
  onSubmit?: (params: Partial<IValues>) => any;
  isLoading: boolean;
};

export type IValues = {
  note: string;
};

const defaultFormInitialValues: IValues = {
  note: ''
};

export const TodoForm: React.FC<IProps> = props => {
  const { isLoading, onSubmit } = props;
  const formik = useFormik({
    initialValues: {
      ...defaultFormInitialValues
    },
    onSubmit: (values: Partial<IValues>) => onSubmit(values),
    validationSchema: Yup.object().shape({
      note: validations.note
    }),
    validateOnChange: true
  });

  const { values, handleBlur, handleSubmit, handleChange, resetForm } = formik;

  return (
    <form
      {...styles.group}
      onSubmit={e => {
        handleSubmit(e);
        setTimeout(() => {
          resetForm();
        }, 2000);
      }}
    >
      <input
        type="text"
        placeholder="What need to be done?"
        value={values.note}
        name="note"
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isLoading}
      />
      {values.note.length ? (
        <img
          {...css(styles.icon, styles.clear)}
          src={images.clear}
          alt="input"
          onClick={() => resetForm()}
        />
      ) : (
        <img {...styles.icon} src={images.edit} alt="input" />
      )}
    </form>
  );
};
