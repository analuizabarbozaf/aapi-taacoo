const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// Habilitar CORS
app.use(cors());

// URL do JSON no GitHub
const JSON_URL = 'https://raw.githubusercontent.com/seu-usuario/api-taco/main/TACO.json';

// Rota para listar todos os alimentos
app.get('/alimentos', async (req, res) => {
    try {
        const response = await axios.get(JSON_URL);
        const data = response.data;
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao carregar os dados' });
    }
});

// Rota para buscar um alimento pelo nome
app.get('/buscar', async (req, res) => {
    try {
        const response = await axios.get(JSON_URL);
        const data = response.data;
        const nome = req.query.nome ? req.query.nome.toLowerCase() : '';

        // Filtrando pelo campo 'description'
        const resultado = data.filter(item => item.description.toLowerCase().includes(nome));

        if (resultado.length === 0) {
            return res.status(404).json({ error: 'Alimento não encontrado' });
        }

        res.json(resultado);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar alimento' });
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`API rodando em http://localhost:${PORT}`);
});
