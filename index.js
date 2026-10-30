document.addEventListener('DOMContentLoaded', () => {
    const colecaoContainer = document.getElementById('colecao');

    // Função para buscar a lista do servidor
    async function carregarCatalogo() {
        try {
            const resposta = await fetch('/api/lista');
            const dados = await resposta.json();
            renderizarColecao(dados);
        } catch (erro) {
            console.error('Erro ao carregar catálogo:', erro);
        }
    }

    function renderizarColecao(itens) {
        if (!colecaoContainer) return;
        colecaoContainer.innerHTML = '';

        itens.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card-item');

            card.innerHTML = `
                <h3>${item.titulo || item.nome}</h3>
                <p>${item.descricao || item.artista || ''}</p>
            `;

            colecaoContainer.appendChild(card);
        });
    }

    carregarCatalogo();
});
