import * as Yup from 'yup';

export const validations = {
  note: Yup.string().required('Please enter note')
};
