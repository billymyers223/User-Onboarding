import * as yup from 'yup';

const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field.").min(1,'Name must be greater than 1 letter'),
    email: yup.string().email("Must be a valid email address.").required("Must include email address"),
    tos: yup.boolean(),
    password: yup.string().required("Must include a password")
})


export default formSchema