const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Array em memória para salvar novos cadastros do formulário
let lista = [
    { artista: "Atalyba e A Firma", musica: "Feminina", audio: "feminina.mp3" },
    { artista: "Marina Lima", musica: "Não Sei Dançar", audio: "nao-sei-dancar.mp3" },
    { artista: "Angra", musica: "Wuthering Heights", audio: "wuthering-heights.mp3" },
    { artista: "Jeff Buckley", musica: "Lover, You Should've Come Over", audio: "lover-you-shouldve-come-over.mp3" }
];

// Rota GET: Retorna os itens do catálogo
app.get('/api/lista', (req, res) => {
    res.json(lista);
});

// Rota POST: Adiciona um novo disco à lista
app.post('/api/lista', (req, res) => {
    const novaObra = req.body;
    lista.push(novaObra);
    res.json({ status: "sucesso", item: novaObra });
});

app.listen(PORT, () => {
    console.log(`Servidor a rodar em http://localhost:${PORT}`);
});
