const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Carregar os dados do arquivo JSON
const data = JSON.parse(fs.readFileSync("TACO.json", "utf8"));

// Rota padrão
app.get("/", (req, res) => {
  res.send("API da Tabela TACO rodando!");
});

// Rota para listar todos os alimentos
app.get("/alimentos", (req, res) => {
  res.json(data);
});

// Rota para buscar alimentos pelo nome (usando "description")
app.get("/buscar", (req, res) => {
  const nome = req.query.nome;
  if (!nome) {
    return res.status(400).json({ error: "Parâmetro 'nome' é obrigatório." });
  }

  const resultado = data.filter((item) =>
    item.description.toLowerCase().includes(nome.toLowerCase())
  );

  if (resultado.length === 0) {
    return res.status(404).json({ error: "Nenhum alimento encontrado." });
  }

  res.json(resultado);
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});


      
