const MODE = import.meta.env.MODE;
const DEV = MODE === "development";
export const BASE_URL = DEV
  ? import.meta.env.VITE_API_BASE_URL_DEV
  : import.meta.env.VITE_API_BASE_URL_PROD;
