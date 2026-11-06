document.addEventListener('DOMContentLoaded', () => {
    const colecaoContainer = document.getElementById('colecao');
    let audioAtual = null;
    let cardAtual = null;

    // Tentar carregar lista dinamica do backend Express
    async function carregarCatalogo() {
        try {
            const resposta = await fetch('/api/lista');
            if (!resposta.ok) throw new Error('Servidor indisponivel');
            const dados = await resposta.json();

            if (Array.isArray(dados) && dados.length > 0) {
                renderizarColecao(dados);
            }
        } catch (erro) {
            console.log('A usar itens estaticos do HTML:', erro.message);
        }
    }

    // Funcao para renderizar novos itens vindos do banco/API
    function renderizarColecao(itens) {
        if (!colecaoContainer) return;
        colecaoContainer.innerHTML = '';

        itens.forEach(item => {
            const card = document.createElement('article');
            card.classList.add('card-item');

            if (item.audio) {
                card.setAttribute('data-audio', item.audio);
            }

            const artista = item.artista || item.titulo || 'Desconhecido';
            const musica = item.musica || item.descricao || '';
            const seloTexto = artista.substring(0, 10).toUpperCase();

            card.innerHTML = `
                <div class="texto-disco">
                    <h3>${artista}</h3>
                    <p>${musica}</p>
                </div>
                <div class="selo-central">
                    <span>${seloTexto}</span>
                </div>
            `;

            colecaoContainer.appendChild(card);
        });
    }

    // Gerenciador de reproducao via delegacao de eventos no container principal
    if (colecaoContainer) {
        colecaoContainer.addEventListener('click', (e) => {
            const card = e.target.closest('.card-item');
            if (!card) return;

            const urlAudio = card.getAttribute('data-audio');
            if (!urlAudio) return;

            // Se for o mesmo disco: alterna entre Play e Pause
            if (cardAtual === card && audioAtual) {
                if (audioAtual.paused) {
                    audioAtual.play().catch(err => console.error('Erro ao reproduzir:', err));
                } else {
                    audioAtual.pause();
                }
                return;
            }

            // Parar musica anterior se houver outra a tocar
            if (audioAtual) {
                audioAtual.pause();
                audioAtual.currentTime = 0;
            }

            // Criar e iniciar nova musica
            audioAtual = new Audio(urlAudio);
            cardAtual = card;

            // Handlers para controle de estado visual do card
            audioAtual.addEventListener('play', () => {
                card.classList.add('tocando');
            });

            audioAtual.addEventListener('pause', () => {
                card.classList.remove('tocando');
            });

            audioAtual.addEventListener('ended', () => {
                card.classList.remove('tocando');
                audioAtual = null;
                cardAtual = null;
            });

            // Reproduz o som
            audioAtual.play().catch(err => {
                card.classList.remove('tocando');
                cardAtual = null;
                audioAtual = null;
                console.error('Certifique-se de que o ficheiro .mp3 esta na pasta do projeto:', err);
            });
        });
    }

    carregarCatalogo();
});
