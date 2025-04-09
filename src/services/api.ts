import axios from "axios";

const api = axios.create({
  baseURL: "https://api.hgbrasil.com",
  params: {
    key: import.meta.env.VITE_HG_API_KEY,
  },
});

export const getFinanceData = async () => {
  const response = await api.get("/finance");
  return response.data.results;
};
