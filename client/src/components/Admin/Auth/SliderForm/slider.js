import "@mui/system";
import React, { useState } from "react";
import "./Slider.scss";
import { Sliders } from "../../../../api";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./Slider.form";

const authController = new Sliders();

export const SliderForm = () => {
  const [error, setError] = useState("");


  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    validateOnBlur: false,

    onSubmit: async (formValues) => {
      try {
        if (!formValues.images) {
          alert("Debe seleccionar una imagen");
        } else {
          const formData = new FormData();
          formData.append("title", formValues.title);
          formData.append("images", formValues.images);
          formData.append("active", formValues.active);

          console.log(formValues);
          await authController.createSlider(formValues);
          setError("");
        }
      } catch (error) {
        setError("Error en el servidor");
      }
    },
  });

  return (
    <Form className="slider-form" onSubmit={formik.handleSubmit} encType="multipart/form-data">
      <Form.Group widths="equal">
        <Form.Input
          fluid
          name="title"
          label="Title"
          placeholder="Title"
          autoComplete="title"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.title}
          error={formik.errors.title}
        />
        <Form.Input
          fluid
          name="images"
          label="url imagen"
          placeholder="url imagen"
          autoComplete="url imagen"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.images}
          error={formik.errors.images}
        />
        <Form.Select
          fluid
          label="Active"
          name="active"
          options={[
            { key: "yes", text: "Sí", value: true },
            { key: "no", text: "No", value: false },
          ]}
          onChange={(e, { name, value }) => formik.setFieldValue(name, value)}
          onBlur={formik.handleBlur}
          value={formik.values.active}
          error={formik.errors.active}
        />
      </Form.Group>
      <Form.Button type="submit" primary fluid content="crear" loading={formik.isSubmitting} />
    </Form>
  );
};
