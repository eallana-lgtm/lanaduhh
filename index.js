document.addEventListener('DOMContentLoaded', () => {
    const colecaoContainer = document.getElementById('colecao');
    let audioAtual = null;
    let cardAtual = null;

    // Tentar carregar lista dinâmica do backend Express
    async function carregarCatalogo() {
        try {
            const resposta = await fetch('/api/lista');
            if (!resposta.ok) throw new Error('Servidor indisponível');
            const dados = await resposta.json();

            if (Array.isArray(dados) && dados.length > 0) {
                renderizarColecao(dados);
            } else {
                ativarEventosAudio();
            }
        } catch (erro) {
            console.log('A usar itens estáticos do HTML.');
            ativarEventosAudio();
        }
    }

    // Função para renderizar novos itens vindos do banco/API
    function renderizarColecao(itens) {
        if (!colecaoContainer) return;
        colecaoContainer.innerHTML = '';

        itens.forEach(item => {
            const card = document.createElement('article');
            card.classList.add('card-item');

            if (item.audio) {
                card.setAttribute('data-audio', item.audio);
            }

            card.innerHTML = `
                <div class="texto-disco">
                    <h3>${item.artista || item.titulo}</h3>
                    <p>${item.musica || item.descricao || ''}</p>
                </div>
                <div class="selo-central">
                    <span>${(item.artista || 'VINYL').substring(0, 10).toUpperCase()}</span>
                </div>
            `;

            colecaoContainer.appendChild(card);
        });

        ativarEventosAudio();
    }

    // Configura o clique em cada disco para tocar/pausar áudio
    function ativarEventosAudio() {
        const cards = document.querySelectorAll('.card-item');

        cards.forEach(card => {
            card.removeEventListener('click', tratarClique);
            card.addEventListener('click', tratarClique);
        });
    }

    function tratarClique(e) {
        const card = e.currentTarget;
        const urlAudio = card.getAttribute('data-audio');

        if (!urlAudio) return;

        // Se for o mesmo disco: alterna entre Play e Pause
        if (cardAtual === card && audioAtual) {
            if (audioAtual.paused) {
                audioAtual.play().catch(err => console.error('Erro ao reproduzir:', err));
                card.classList.add('tocando');
            } else {
                audioAtual.pause();
                card.classList.remove('tocando');
            }
            return;
        }

        // Parar música anterior se houver outra a tocar
        if (audioAtual) {
            audioAtual.pause();
            if (cardAtual) cardAtual.classList.remove('tocando');
        }

        // Iniciar nova música
        audioAtual = new Audio(urlAudio);
        audioAtual.play().then(() => {
            card.classList.add('tocando');
            cardAtual = card;
        }).catch(err => {
            card.classList.remove('tocando');
            console.error('Certifique-se de que o arquivo .mp3 está na pasta do projeto:', err);
        });

        audioAtual.onended = () => {
            card.classList.remove('tocando');
        };
    }

    carregarCatalogo();
});
