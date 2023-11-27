import "@mui/system";
import React, { useState } from "react";
import "./Product.scss";
import { Product } from "../../../../api";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./product.form";

const authController = new Product();

export const ProductForm = () => {
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    validateOnBlur: false,

    onSubmit: async (formValues) => {
      try {
        console.log(formValues);
        await authController.createProduct(formValues);
        setError("");
      } catch (error) {
        setError("Error en el servidor");
      }
    },
  });

  return (
    <Form
      className="Product-form"
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
         <Form.Input
          fluid
          name="image1"
          label="Seleccione una imagen"
          placeholder="Seleccione una imagen"
          autoComplete="Seleccione una imagen"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.image1}
          error={formik.errors.image1}
        />
        <Form.Input
          fluid
          name="image2"
          label="Seleccione una imagen"
          placeholder="Seleccione una imagen"
          autoComplete="Seleccione una imagen"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.image2}
          error={formik.errors.image2}
        />
        <Form.Input
          fluid
          name="image3"
          label="Seleccione una imagen"
          placeholder="Seleccione una imagen"
          autoComplete="Seleccione una imagen"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.image3}
          error={formik.errors.image3}
        />
        <Form.Input
          fluid
          name="category"
          label="Ingresa una categoria"
          placeholder="Ingresa una categoria"
          autoComplete="Ingresa una categoria"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.category}
          error={formik.errors.category}
        />
        <Form.Group inline>
        <label>available</label>
        <Form.Radio
          label="Yes"
          name="available"
          value={true}
          checked={formik.values.available === true}
          onChange={() => formik.setFieldValue("available", true)}
          onBlur={formik.handleBlur}
        />
        <Form.Radio
          label="No"
          name="available"
          value={false}
          checked={formik.values.available === false}
          onChange={() => formik.setFieldValue("available", false)}
          onBlur={formik.handleBlur}
        />
        </Form.Group>
        <Form.Group inline>
        <label>soldOut</label>
        <Form.Radio
          label="Yes"
          name="soldOut"
          value={true}
          checked={formik.values.soldOut === true}
          onChange={() => formik.setFieldValue("soldOut", true)}
          onBlur={formik.handleBlur}
        />
        <Form.Radio
          label="No"
          name="soldOut"
          value={false}
          checked={formik.values.soldOut === false}
          onChange={() => formik.setFieldValue("soldOut", false)}
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
