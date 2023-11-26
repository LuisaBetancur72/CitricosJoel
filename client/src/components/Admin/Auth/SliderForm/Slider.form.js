import * as Yup from "yup";

export const initialValues = () => {
  
  return {
    title: "",
    images: "",
    active: "",
  };
};

export function validationSchema() {
    return Yup.object({
      title: Yup.string().required("El título es requerido"),
      images: Yup.string().required("La url es requerida"),
      active: Yup.bool(),
    });
  }