import * as Yup from "yup";

export const initialValues = () => {
  
  return {
    name: "",
    active: "",
    image1:"",
    image2:"",
    image3:"",
    category: "",
    available: "",
    soldOut:""
    

  };
};
export function validationSchema() {
    return Yup.object({
      name: Yup.string().required("El nombre es requerido"),
      active: Yup.bool().required("Seleccione una opcion"),
      image1:Yup.string().required("La imagen es requerida"),
      image2:Yup.string().required("La imagen es requerida"),
      image3:Yup.string().required("La imagen es requerida"),
      category: Yup.string().required("La categoria es requerido"),
      available: Yup.bool().required("Seleccione una opcion"),
      soldOut: Yup.bool().required("Seleccione una opcion")
    });
  }