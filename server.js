const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares para ler JSON e dados de formulários
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos da pasta do projeto (HTML, CSS, JS, MP3)
app.use(express.static(path.join(__dirname)));

// Array em memória para salvar a lista do catálogo
let lista = [
    { artista: "Atalyba e A Firma", musica: "Feminina", audio: "feminina.mp3" },
    { artista: "Marina Lima", musica: "Não Sei Dançar", audio: "nao-sei-dancar.mp3" },
    { artista: "Angra", musica: "Wuthering Heights", audio: "wuthering-heights.mp3" },
    { artista: "Jeff Buckley", musica: "Lover, You Should've Come Over", audio: "lover-you-shouldve-come-over.mp3" }
];

// Rota GET: Retorna a lista atualizada de discos
app.get('/api/lista', (req, res) => {
    res.json(lista);
});

// Rota POST: Cadastra um novo disco no catálogo
app.post('/api/lista', (req, res) => {
    const { artista, musica, audio } = req.body;

    // Validação simples dos dados recebidos
    if (!artista || !musica) {
        return res.status(400).json({ status: "erro", mensagem: "Campos 'artista' e 'musica' são obrigatórios." });
    }

    const novaObra = {
        artista: artista.trim(),
        musica: musica.trim(),
        audio: audio ? audio.trim() : ""
    };

    lista.push(novaObra);
    return res.status(201).json({ status: "sucesso", item: novaObra });
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
