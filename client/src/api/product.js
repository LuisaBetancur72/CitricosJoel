import { ENV } from "../utils";
import { Auth } from './auth';

const { BASE_PATH, API_ROUTES } = ENV;

const authInstance = new Auth();
const accessToken = authInstance.getAccessToken();

export class Product {
  baseApi = BASE_PATH;

  createProduct = async (formValues) => {
    const url = `${this.baseApi}/${API_ROUTES.CREATE_PRODUCT}`;
    console.log(formValues);
    const params = {
      method: "POST",
      body: JSON.stringify(formValues),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    console.log(params);
    try {
      const response = await fetch(url, params);
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.status);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

    updateProduct = async (sliderId, sliderData) => {
    console.log("Categoria  ", sliderId);
    const url = `${BASE_PATH}/${API_ROUTES.UPDATE_PRODUCT}/${sliderId}`;
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(sliderData), // Agrega el cuerpo de la solicitud con los datos actualizados
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }

      const result = await response.json();
      console.log("Resultado de la actualización:", result);
      return result;
    } catch (error) {
      console.error("Error al actualizar usuario:", error.message);
      throw error;
    }
  };

  getProductByCategoty = async (categoryName, categoryData) => {
    console.log("Categoria  ", categoryName);
    const url = `${BASE_PATH}/${API_ROUTES.GET_PRODUCTBY_CATEGORY}/${categoryName}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(categoryData), 
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error al actualizar usuario:", error.message);
      throw error;
    }
  };

    getProduct = async (data) => {
    const url = `${this.baseApi}/${API_ROUTES.GET_PRODUCT}`;
    console.log(url);
    const params = {
      method: "GET",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    console.log(params);

    try {
      const response = await fetch(url, params);
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.status);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
    getProducts = async (data) => {
    const url = `${this.baseApi}/${API_ROUTES.GET_PRODUCTS}`;
    console.log(url);
    const params = {
      method: "GET",
      body: data,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };
    console.log(params);

    try {
      const response = await fetch(url, params);
      if (!response.ok) {
        throw new Error("Error en la solicitud: " + response.status);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
    };
}
