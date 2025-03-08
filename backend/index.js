require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

// Middleware para permitir requisições do frontend
app.use(cors());
app.use(express.json());

// Rota para enviar a pergunta à API da IA
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch("https://biblia-puug.vercel.app/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-key": process.env.API_KEY, // Chave de API do .env
      },
      body: JSON.stringify({ message }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Erro:", error);
    res.status(500).json({ error: "Ocorreu um erro ao buscar a resposta." });
  }
});

// Rota de teste para verificar se o backend está funcionando
app.get("/", (req, res) => {
  res.send("Backend está funcionando!");
});

// Inicia o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
