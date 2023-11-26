import { ENV } from "../utils";
import { Auth } from './auth';

const { BASE_PATH, API_ROUTES } = ENV;

const authInstance = new Auth();
const accessToken = authInstance.getAccessToken();

export class Sliders {
  baseApi = BASE_PATH;

  createSlider = async (formValues) => {
    const url = `${this.baseApi}/${API_ROUTES.CREATE_SLIDER}`;
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

  updateSlider = async (userId, userData) => {
    console.log("Slider", userId);
    const url = `${BASE_PATH}/${API_ROUTES.UPDATE_SLIDER}/${userId}`;
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(userData), // Agrega el cuerpo de la solicitud con los datos actualizados
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
  
  updateSlider = async (sliderId, sliderData) => {
    console.log("Slider ", sliderId);
    const url = `${BASE_PATH}/${API_ROUTES.UPDATE_SLIDER}/${sliderId}`;
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

  getSlider = async (data) => {
    const url = `${this.baseApi}/${API_ROUTES.GET_SLIDER}`;
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
  getSliders = async (data) => {
    const url = `${this.baseApi}/${API_ROUTES.GET_SLIDERS}`;
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
