import "@mui/system";
import React, { useState } from "react";
import "./Category.scss";
import { Category } from "../../../../api";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./category.form";

const authController = new Category();

export const CategoryForm = () => {
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    validateOnBlur: false,

    onSubmit: async (formValues) => {
      try {
        const formData = new FormData();
        formData.append("title", formValues.name);
        formData.append("active", formValues.active);
        console.log(formValues);
        await authController.createCategory(formValues);
        setError("");
      } catch (error) {
        setError("Error en el servidor");
      }
    },
  });

  return (
    <Form
      className="category-form"
      onSubmit={formik.handleSubmit}
      encType="multipart/form-data"
    >
      <Form.Group widths="equal">
        <Form.Input
          fluid
          name="name"
          label="Nombre de la categoria"
          placeholder="Nombre de la categoria"
          autoComplete="Nombre de la categoria"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.name}
          error={formik.errors.name}
        />
        </Form.Group>
        <Form.Group inline>
        <label>Active</label>
        <Form.Radio
          label="Yes"
          name="active"
          value={true}
          checked={formik.values.active === true}
          onChange={() => formik.setFieldValue("active", true)}
          onBlur={formik.handleBlur}
        />
        <Form.Radio
          label="No"
          name="active"
          value={false}
          checked={formik.values.active === false}
          onChange={() => formik.setFieldValue("active", false)}
          onBlur={formik.handleBlur}
        />
      </Form.Group>
      <Form.Button
        type="submit"
        primary
        fluid
        content="crear"
        loading={formik.isSubmitting}
      />
    </Form>
  );
};
