import * as yup from 'yup';

export const sharesValidationSchema = yup.object().shape({
  company_name: yup.string().required(),
  quantity: yup.number().integer().required(),
  user_id: yup.string().nullable(),
});
