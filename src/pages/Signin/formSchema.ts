import * as Yup from 'yup';

export interface InitialValues {
  email: string;
  password: string;
}

const initialValues: InitialValues = {
  email: 'teste@gmail.com',
  password: '123456',
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Campo obrigatório.').email('Não é um email válido.'),
  password: Yup.string().required('Campo obrigatório.'),
});

const formSchema = {
  initialValues,
  validationSchema,
  validateOnChange: false,
  validateOnBlur: false, 
};

export default formSchema;