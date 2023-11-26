import React,{useContext, useEffect} from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { useAuth } from "../../../../hooks";
import { Auth } from "../../../../api";
import { initialValues, validationSchema } from "./LoginForm.form";
import { AuthContext } from '../../../../contexts';


const authController = new Auth();

export const LoginForm = () => {
  const { login } = useAuth();
  const { user } = useContext(AuthContext);
  
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    validateOnBlur: false,

    onSubmit: async (formValue) => {
      try {
        const response = await authController.login(formValue);
        authController.setAccessToken(response.access);
        authController.setRefreshToken(response.refresh);
        login(response.access);
      } catch (error) {
        console.error(error);
      }
    },
  });
  useEffect(() => {
    // Este código se ejecuta cuando 'user' se actualiza
    console.log("usuario después de ser seteado", user);

    // Puedes colocar aquí el código que depende de 'user' actualizado
    if (user && user.role === "admin") {
      window.location.href = '/admin/users';
    } else if (user && user.role === "user" && user.active === true) {
      window.location.href = '/user';
    }
  }, [user]);

 

  return (
    <Form className="register-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="email"
        placeholder="Correo electrónico"
        autoComplete="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.errors.email}
      />
      <Form.Input
        name="new_password"
        type="password"
        autoComplete="new_password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        value={formik.values.new_password}
        error={formik.errors.new_password}
      />

      <Form.Button
        type="submit"
        primary
        fluid
        content="Iniciar sesión"
        loading={formik.isSubmitting}
      />
    </Form>
  );
};
