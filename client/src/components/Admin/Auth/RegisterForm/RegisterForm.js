import '@mui/system';
import React, { useEffect, useState } from "react";
import "./RegisterForm.scss";
import { Auth } from "../../../../api";
import { Form} from "semantic-ui-react";
import { Dropdown } from "semantic-ui-react";
import { Button, Modal } from "@mui/material";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./RegisterForm.form";

const authController = new Auth();

export const RegisterForm = (props) => {
  const [tipoDocumentoSeleccionado, setTipoDocumentoSeleccionado] = useState("");
  const documentTypes = ['Cedula de Ciudadania', 'Pasaporte', 'Cedula de Extrangeria'];
  const { openLogin } = props;
  const [error, setError] = useState("");
  const [departamentos, setDepartamentos] = useState([]);
  const [municipios, setMunicipios] = useState([]);
  const [departamentoSeleccionado, setDepartamentoSeleccionado] = useState("");
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState("");
  const [showPolicyWarning, setShowPolicyWarning] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://www.datos.gov.co/resource/xdk5-pm3f.json");
        const data = await response.json();
        const departamentos = Array.from(
          new Set(data.map((municipio) => municipio.departamento))
        ).map((departamento) => ({
          key: departamento,
          value: departamento,
          text: departamento,
        }));

        departamentos.sort((a, b) => a.text.localeCompare(b.text));
        setDepartamentos(departamentos);
      } catch (error) {
        console.error("Error al obtener los departamentos:", error);
      }
    };
    fetchData();
  }, []);

  const fetchMunicipios = async (departamento) => {
    try {
      const response = await fetch(`https://www.datos.gov.co/resource/xdk5-pm3f.json?departamento=${departamento}`);
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0 && data[0].c_digo_dane_del_municipio) {
        const municipios = data.map((municipio) => ({
          key: municipio.c_digo_dane_del_municipio,
          value: municipio.c_digo_dane_del_municipio,
          text: municipio.municipio,
        }));

        municipios.sort((a, b) => a.text.localeCompare(b.text));
        setMunicipios(municipios);
      } else {
        console.error("Error: Los datos de municipios no tienen la estructura esperada");
        setMunicipios([]);
      }
    } catch (error) {
      console.error("Error al obtener los municipios:", error);
      setMunicipios([]);
    }
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    validateOnBlur: false,

    onSubmit: async (formValue) => {
      try {
        if (!formik.values.privacyPolicy) {
          setShowPolicyWarning(true);
        } else {
          setShowPolicyWarning(false); // Restablecer a false cuando se envía con éxito
          setError("");
          await authController.register(formValue);
          openLogin();
        }
      } catch (error) {
        setError("Error en el servidor");
      }
    },
  });

  return (
    <Form className="register-form" onSubmit={formik.handleSubmit}>
      <Form.Group widths="equal">
        <Form.Input
          fluid
          name="firstname"
          label="Nombre(s)"
          placeholder="First name"
          autoComplete="firstname"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.firstname}
          error={formik.errors.firstname}
        />
        <Form.Input
          fluid
          name="lastname"
          label="Apellido(s)"
          placeholder="Last name"
          autoComplete="lastname"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.lastname}
          error={formik.errors.lastname}
        />
      </Form.Group>
      <Form.Input
        name="email"
        label="Correo"
        placeholder="Correo electrónico"
        autoComplete="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.errors.email}
      />
      <Form.Input
        name="new_password"
        label="Contraseña"
        type="password"
        autoComplete="new_password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        value={formik.values.new_password}
        error={formik.errors.new_password}
      />
      <Form.Input
        name="confirmPassword"
        label="Repetir contraseña"
        type="password"
        autoComplete="confirmPassword"
        placeholder="Repetir contraseña"
        onChange={formik.handleChange}
        value={formik.values.confirmPassword}
        error={formik.errors.confirmPassword}
      />
      <Form.Group widths="equal">
        <Form.Field>
          <label>Selecciona un departamento:</label>
          <Dropdown
            placeholder="Seleccionar"
            selection
            options={departamentos}
            value={departamentoSeleccionado}
            onChange={(_, { value }) => {
              setDepartamentoSeleccionado(value);
              fetchMunicipios(value);
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>Selecciona un municipio:</label>
          <Dropdown
            placeholder="Seleccionar"
            selection
            options={municipios}
            value={municipioSeleccionado}
            onChange={(_, { value }) => setMunicipioSeleccionado(value)}
            disabled={!departamentoSeleccionado}
          />
        </Form.Field>
      </Form.Group>
      <Form.Field>
        <label>Selecciona el tipo de documento:</label>
        <Dropdown
          placeholder="Seleccionar"
          selection
          options={documentTypes.map((type) => ({ value: type, text: type }))}
          value={tipoDocumentoSeleccionado}
          onChange={(_, { value }) => setTipoDocumentoSeleccionado(value)}
        />
        <Form.Input
          fluid
          name="document"
          label="Document"
          placeholder="document"
          autoComplete="document"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.document}
          error={formik.errors.document}
        />
      <Form.Input
          fluid
          name="role"
          label="Role"
          placeholder="role"
          autoComplete="role"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.role}
          error={formik.errors.role}
        />
        <Form.Input
          fluid
          name="phone"
          label="phone"
          placeholder="phone"
          autoComplete="phone"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.phone}
          error={formik.errors.phone}
        />
      </Form.Field>
      <Form.Checkbox
        name="privacyPolicy"
        label="He leído y acepto las políticas de privacidad"
        onChange={(_, data) =>
          formik.setFieldValue("privacyPolicy", data.checked)
        }
        checked={formik.values.privacyPolicy}
        error={formik.touched.privacyPolicy && formik.errors.privacyPolicy}
      />

      {formik.touched.privacyPolicy && formik.errors.privacyPolicy && (
        <p className="register-form__error">{formik.errors.privacyPolicy}</p>
      )}
      <Form.Button
        type="submit"
        primary
        fluid
        content="Registrarse"
        loading={formik.isSubmitting}
        disabled={!formik.isValid || showPolicyWarning}
      />
      {error && <p className="register-form__error">{error}</p>}
      {/* Modal de advertencia */}
      <Modal open={showPolicyWarning} onClose={() => setShowPolicyWarning(false)}>
        <div className="modal">
          <h3>Aviso</h3>
          <p>Debes aceptar las políticas de privacidad para registrarte.</p>
          <Button onClick={() => setShowPolicyWarning(false)}>Aceptar</Button>
        </div>
      </Modal>
    </Form>
  );
};
