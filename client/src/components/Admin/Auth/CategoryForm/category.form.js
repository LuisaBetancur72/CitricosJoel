import * as Yup from "yup";

export const initialValues = () => {
  
  return {
    name: "",
    active: "",
  };
};

export function validationSchema() {
    return Yup.object({
      name: Yup.string().required("El título es requerido"),
      active: Yup.bool().required("Seleccione una opcion"),
    });
  }