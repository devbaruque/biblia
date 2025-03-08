const express = require("express");
const cors = require("cors");
const app = express();

// Configura o CORS para permitir requisições do frontend
app.use(
  cors({
    origin: "https://santosaber.vercel.app", // URL do frontend
    methods: ["GET", "POST", "OPTIONS"], // Métodos permitidos
    allowedHeaders: ["Content-Type"], // Cabeçalhos permitidos
  })
);

app.use(express.json());

// Rota OPTIONS para /api/chat
app.options("/api/chat", (req, res) => {
  res.header("Access-Control-Allow-Origin", "https://santosaber.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.send();
});

// Rota POST para /api/chat
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  console.log("Pergunta recebida:", message); // Log da pergunta

  try {
    const response = await fetch("https://chatbiblia.fly.dev/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-key": process.env.API_KEY,
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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
