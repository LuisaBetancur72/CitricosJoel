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
    CREATE_CATEGORY: "category/create",
    GET_CATEGORY: "category/one",
    GET_CATEGORYS: "category/",
    UPDATE_CATEGORY: "category",
    DELETE_CATEGORY: "category",
    CREATE_PRODUCT: "product/create",
    GET_PRODUCT: "product/one",
    GET_PRODUCTS: "product/",
    UPDATE_PRODUCT: "product",
    DELETE_PRODUCT: "product",
    GET_PRODUCTBY_CATEGORY: "product/category",
  },
  JWT:{
    ACCESS: "access",
    REFRESH: "refresh"
  }
};
