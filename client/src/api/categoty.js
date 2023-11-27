import { ENV } from "../utils";
import { Auth } from './auth';

const { BASE_PATH, API_ROUTES } = ENV;

const authInstance = new Auth();
const accessToken = authInstance.getAccessToken();

export class Category {
  baseApi = BASE_PATH;

  createCategory = async (formValues) => {
    const url = `${this.baseApi}/${API_ROUTES.CREATE_CATEGORY}`;
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

    updateCategoty = async (sliderId, sliderData) => {
    console.log("Categoria  ", sliderId);
    const url = `${BASE_PATH}/${API_ROUTES.UPDATE_CATEGORY}/${sliderId}`;
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

    getCategoty = async (data) => {
    const url = `${this.baseApi}/${API_ROUTES.GET_CATEGORY}`;
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
    getCategotys = async (data) => {
    const url = `${this.baseApi}/${API_ROUTES.GET_CATEGORYS}`;
    console.log(url);
    const params = {
      method: "GET",
      body: data,
      headers: {
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
