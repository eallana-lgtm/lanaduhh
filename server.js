const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares para ler JSON e dados de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir ficheiros estaticos da pasta do projeto (HTML, CSS, JS, MP3)
app.use(express.static(path.join(__dirname)));

// Array em memoria para salvar a lista do catalogo
let lista = [
    { artista: "Atalyba e A Firma", musica: "Feminina", audio: "feminina.mp3" },
    { artista: "Marina Lima", musica: "Nao Sei Dancar", audio: "nao-sei-dancar.mp3" },
    { artista: "Angra", musica: "Wuthering Heights", audio: "wuthering-heights.mp3" },
    { artista: "Jeff Buckley", musica: "Lover, You Should've Come Over", audio: "lover-you-shouldve-come-over.mp3" }
];

// Rota GET: Retorna a lista atualizada de discos
app.get('/api/lista', (req, res) => {
    res.json(lista);
});

// Rota POST: Cadastra um novo disco no catalogo
app.post('/api/lista', (req, res) => {
    const { artista, musica, audio } = req.body;

    // Validacao simples dos dados recebidos
    if (!artista || !musica) {
        return res.status(400).json({ status: "erro", mensagem: "Campos artista e musica sao obrigatorios." });
    }

    const novaObra = {
        artista: artista.trim(),
        musica: musica.trim(),
        audio: audio ? audio.trim() : ""
    };

    lista.push(novaObra);
    return res.status(201).json({ status: "sucesso", item: novaObra });
});

// Inicializacao do servidor
app.listen(PORT, () => {
    console.log(`Servidor a rodar em http://localhost:${PORT}`);
});
