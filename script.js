function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Verifica se já existe um UUID armazenado em sessionStorage
let uuid = null

// // Se não existir, gera um novo UUID e armazena em sessionStorage
// if (!uuid) {
//     uuid = uuidv4();
//     sessionStorage.setItem('uuid', uuid);
// }


window.onload = function(){
    uuid = uuidv4();
    console.log('Onload disparado ', uuid);

  }


document.getElementById('questionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const questionInput = document.getElementById('questionInput');
    const loading = document.getElementById('loading');
    const responseDiv = document.getElementById('response');
    const questionDisplay = document.getElementById('questionDisplay');
    const submitButton = this.querySelector('button');
    const containerResposta = document.getElementById('responseContainer');

    const question = questionInput.value;

    loading.style.display = 'block';
    responseDiv.style.display = 'none';
    questionDisplay.style.display = 'none';
    submitButton.disabled = true;
    containerResposta.style.display = 'none';

    questionInput.value = '';
    fetch('https://chatbiblia.fly.dev/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-key': uuid
        },
        body: JSON.stringify({ message: question })
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        loading.style.display = 'none';
        questionDisplay.style.display = 'block';
        questionDisplay.textContent = `Pergunta: ${question}`;
        responseDiv.style.display = 'block';
        containerResposta.style.display = 'block';
        responseDiv.innerHTML = data.message;
        submitButton.disabled = false;
    })
    .catch(error => {
        loading.style.display = 'none';
        responseDiv.style.display = 'block';
        responseDiv.textContent = 'Ocorreu um erro ao buscar a resposta. Tente novamente.';
        submitButton.disabled = false;
        console.error('Erro:', error);
    });
});
