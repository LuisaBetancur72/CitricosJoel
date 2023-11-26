const SERVER_IP = "localhost:3200";
const API_VERSION = "v1";

export const ENV = {
  BASE_PATH: `http://${SERVER_IP}/api/${API_VERSION}`,
  API_ROUTES: {
    REGISTER: "auth/register",
    LOGIN: "auth/login",
    USER_ME: "users/me",
    GET_USERS: "users/",
    UPDATE_USER: "users",
    DELETE_USER: "users",
    REFRESH_TOKEN: "auth/refresh_access_token",
    CREATE_SLIDER: "slider/create",
    GET_SLIDER: "slider/one",
    GET_SLIDERS: "slider/",
    UPDATE_SLIDER: "slider",
    DELETE_SLIDER: "slider",
  },
  JWT:{
    ACCESS: "access",
    REFRESH: "refresh"
  }
};
