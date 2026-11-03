const API_URL = '/jogador';

/* Função para exibir mensagens de feedback visual
(sucesso ou erro) no topo da página */
function showFeedback(message, isSuccess) {
    const feedback = document.getElementById('feedback');
    feedback.className = isSuccess ? 'feedback-success' : 'feedback-error';
    feedback.innerText = message;
    feedback.style.display = 'block';
    //oculta depois
    setTimeout(() => { feedback.style.display = 'none'; }, 4000);
}

// 1. POST - Salvar Jogador
document.getElementById('formSalvar').addEventListener('submit', async (e) => {
    //cancela recarregamento da página
    e.preventDefault();

    // Captura os valores dos campos do formulário e cria um objeto JavaScript
    const jogador = {
        nome: document.getElementById('postNome').value,
        idade: parseInt(document.getElementById('postIdade').value),
        posicao: document.getElementById('postPosicao').value,
        time: document.getElementById('postTime').value
    };

    try {
        //Fetch API assincrona (async/await)

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, // Informa ao backend que o corpo é um JSON
            body: JSON.stringify(jogador) // JavaScript pra String JSON
        });

        // Valida se o status HTP está na faixa 200-299
        if (response.ok) {
            showFeedback('Jogador cadastrado com sucesso!', true);
            document.getElementById('formSalvar').reset();
        } else {
            showFeedback('Erro ao cadastrar jogador.', false);
        }
    } catch (error) {
        showFeedback('Erro de conexão com o servidor.', false);
    }
});

// 2. GET - Buscar Jogador por Nome
document.getElementById('btnBuscar').addEventListener('click', async () => {

    const nome = document.getElementById('getNome').value;
    if (!nome) return showFeedback('Digite um nome para buscar.', false);

    try {
     // Passa o nome como Query Parameter na URL ex: /jogador?nome=Bruninho
        const response = await fetch(`${API_URL}?nome=${encodeURIComponent(nome)}`);
        if (response.ok) {

            // Converte o corpo da resposta JSON em um objeto JavaScript
            const data = await response.json();
            //atualiza
            document.getElementById('resId').innerText = data.id;
            document.getElementById('resNome').innerText = data.nome;
            document.getElementById('resIdade').innerText = data.idade;
            document.getElementById('resPosicao').innerText = data.posicao;
            document.getElementById('resTime').innerText = data.time;
            //exibe resultado
            document.getElementById('resultadoBusca').style.display = 'block';
            showFeedback('Jogador encontrado!', true);
        } else {
            document.getElementById('resultadoBusca').style.display = 'none';
            showFeedback('Jogador não encontrado (404).', false);
        }
    } catch (error) {
        showFeedback('Erro ao buscar jogador.', false);
    }
});

// 3. PUT - Atualizar Jogador por ID
document.getElementById('formAtualizar').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('putId').value;
    const jogador = {};

    const nome = document.getElementById('putNome').value;
    const idade = document.getElementById('putIdade').value;
    const posicao = document.getElementById('putPosicao').value;
    const time = document.getElementById('putTime').value;

    if (nome) jogador.nome = nome;
    if (idade) jogador.idade = parseInt(idade);
    if (posicao) jogador.posicao = posicao;
    if (time) jogador.time = time;

    try {
        const response = await fetch(`${API_URL}?id=${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(jogador)
        });

        if (response.ok) {
            showFeedback('Jogador atualizado com sucesso!', true);
            document.getElementById('formAtualizar').reset();
        } else {
            showFeedback('Erro ao atualizar jogador.', false);
        }
    } catch (error) {
        showFeedback('Erro de conexão ao atualizar.', false);
    }
});

// 4. DELETE - Deletar Jogador por Nome
document.getElementById('btnDeletar').addEventListener('click', async () => {
    const nome = document.getElementById('deleteNome').value;
    if (!nome) return showFeedback('Digite o nome para deletar.', false);

    try {
        const response = await fetch(`${API_URL}?nome=${encodeURIComponent(nome)}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            showFeedback('Jogador removido com sucesso!', true);
            document.getElementById('deleteNome').value = '';
            document.getElementById('resultadoBusca').style.display = 'none';
        } else {
            showFeedback('Erro ao deletar jogador.', false);
        }
    } catch (error) {
        showFeedback('Erro de conexão ao deletar.', false);
    }
});