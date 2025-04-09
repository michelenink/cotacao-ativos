import axios from "axios";

export const getFinanceData = async () => {
  try {
    const response = await axios.get("/api/finance");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados financeiros:", error);
    throw new Error(
      "Não foi possível obter os dados financeiros. Tente novamente."
    );
  }
};
