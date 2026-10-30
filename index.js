document.addEventListener('DOMContentLoaded', () => {
    const colecaoContainer = document.getElementById('colecao');

    async function carregarCatalogo() {
        try {
            const resposta = await fetch('/api/lista');
            if (!resposta.ok) throw new Error('Falha na resposta do servidor');
            
            const dados = await resposta.json();
            
            // Só sobrescreve os itens do HTML se a API retornar dados válidos
            if (Array.isArray(dados) && dados.length > 0) {
                renderizarColecao(dados);
            }
        } catch (erro) {
            console.log('Servidor offline ou sem itens salvos. Exibindo itens padrão.');
        }
    }

    function renderizarColecao(itens) {
        if (!colecaoContainer) return;
        colecaoContainer.innerHTML = '';

        itens.forEach(item => {
            const card = document.createElement('div');
            card.classList.add('card-item');

            card.innerHTML = `
                <div class="disco-conteudo">
                    <h3>${item.titulo || item.nome}</h3>
                    <p>${item.descricao || item.artista || ''}</p>
                </div>
            `;

            colecaoContainer.appendChild(card);
        });
    }

    carregarCatalogo();
});
