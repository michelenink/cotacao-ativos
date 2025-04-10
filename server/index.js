const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/api/finance", async (req, res) => {
  try {
    const response = await axios.get("https://api.hgbrasil.com/finance", {
      params: {
        key: process.env.VITE_HG_API_KEY, 
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    res.status(500).json({ error: "Erro ao buscar dados financeiros" });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
