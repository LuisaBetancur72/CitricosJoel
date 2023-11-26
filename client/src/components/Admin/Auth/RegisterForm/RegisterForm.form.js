import * as Yup from "yup";

export const initialValues = () => {
  
  return {
    firstname: "",
    lastname: "",
    email: "",
    new_password: "",
    confirmPassword: "",
    documentType:"",
    document:"",
    role:"",
    phone:"",
    privacyPolicy: false,
    
  };
};

export function validationSchema(){
  return Yup.object({
    firstname: Yup.string()
      .required("El nombre es requerido"),
    lastname: Yup.string()
      .required("El apellido requerido"),
    email: Yup.string()
      .email("El correo no es válido")
      .required("Campo requerido")
      .test('is-gmail-or-outlook', 'Solo se permiten correos de Gmail o Outlook', (value) => {
      const allowedDomains = ['gmail.com', 'outlook.com'];
        if (!value) return true; // No validation if email is not provided
        const domain = value.split('@')[1];
        return allowedDomains.includes(domain);
      }),
    new_password: Yup.string().required("Campo requerido"),
    confirmPassword: Yup.string()
      .required("Campo requerido")
      .oneOf([Yup.ref("new_password")], "Las contraseñas no coinciden."),
    
    document: Yup.string(),
    role: Yup.string(),
    phone: Yup.number(),
    privacyPolicy: Yup.bool().isTrue(true),
  });
};
