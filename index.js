document.addEventListener('DOMContentLoaded', () => {
    const colecaoContainer = document.getElementById('colecao');

    // Função para buscar a lista do servidor
    async function carregarCatalogo() {
        try {
            const resposta = await fetch('/api/lista');
            
            // Verifica se a requisição HTTP foi bem-sucedida (status 200-299)
            if (!resposta.ok) {
                throw new Error(`Erro na requisição: ${resposta.status} ${resposta.statusText}`);
            }

            const dados = await resposta.json();
            renderizarColecao(dados);
        } catch (erro) {
            console.error('Erro ao carregar catálogo:', erro);
            if (colecaoContainer) {
                colecaoContainer.innerHTML = '<p>Erro ao carregar a coleção. Tente novamente mais tarde.</p>';
            }
        }
    }

    function renderizarColecao(itens) {
        if (!colecaoContainer) return;
        colecaoContainer.innerHTML = '';

        // Garante que 'itens' seja um array antes de rodar o forEach
        if (!Array.isArray(itens)) {
            console.error('Os dados recebidos não são uma lista:', itens);
            colecaoContainer.innerHTML = '<p>Nenhum item encontrado.</p>';
            return;
        }

        itens.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card-item');

            card.innerHTML = `
                <h3>${item.titulo || item.nome || 'Sem título'}</h3>
                <p>${item.descricao || item.artista || ''}</p>
            `;

            colecaoContainer.appendChild(card);
        });
    }

    carregarCatalogo();
});
