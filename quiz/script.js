const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultContainerElement = document.getElementById('result-container');
const resultTextElement = document.getElementById('result-text');
const questionCounterElement = document.getElementById('question-counter');
const questionsLeftElement = document.getElementById('questions-left');
const counterContainerElement = document.getElementById('counter-container');
const answersWithExplanationElement = document.getElementById('answers-with-explanation');
const scoreboardElement = document.getElementById('scoreboard');
const playerInputs = document.getElementById('player-inputs');
const currentPlayerContainer = document.getElementById('current-player-container');
const currentPlayerElement = document.getElementById('current-player');
const numPlayersSelect = document.getElementById('num-players');

let shuffledQuestions, currentQuestionIndex, currentPlayerIndex;
let players = [];
let scores = [];
let totalQuestionsAnswered = 0;

const questions = [
    {
        question: 'O que é uma memória?',
        answers: [
            { text: 'Armazenamento de dados', correct: true },
            { text: 'Unidade de processamento', correct: false },
            { text: 'Dispositivo de entrada', correct: false },
            { text: 'Dispositivo de saída', correct: false }
        ]
    },
    {
        question: 'Em quantos segundos é processado um dado?',
        answers: [
            { text: '1 segundo', correct: false },
            { text: '10 segundos', correct: false },
            { text: '100 milissegundos', correct: false },
            { text: 'Depende do processador', correct: true }
        ]
    },
    {
        question: 'Cite exemplos de memória primária.',
        answers: [
            { text: 'SSD', correct: false },
            { text: 'ROM (Memória Somente de Leitura)', correct: true },
            { text: 'Cache', correct: false },
            { text: 'HD (Disco Rígido)', correct: false }
        ]
    },
    {
        question: 'Cite exemplos de memória secundária.',
        answers: [
            { text: 'RAM (Memória de Acesso Aleatório)', correct: false },
            { text: 'ROM (Memória Somente de Leitura)', correct: false },
            { text: 'HD (Disco Rígido)', correct: true },
            { text: 'Cache', correct: false }
        ]
    },
    {
        question: 'Quais dos modos de Endereçamento de Instruções está errado?',
        answers: [
            { text: 'Imediato', correct: false },
            { text: 'Direto', correct: false },
            { text: 'Indireto', correct: false },
            { text: 'Por registrador', correct: false },
            { text: 'Condicional', correct: true }
        ]
    },
    {
        question: 'O que é um Registrador?',
        answers: [
            { text: 'Armazena dados temporários dentro do processador', correct: true },
            { text: 'Dispositivo de entrada', correct: false },
            { text: 'Dispositivo de saída', correct: false },
            { text: 'Unidade de processamento', correct: false }
        ]
    },
    {
        question: 'O que é Memória Cache?',
        answers: [
            { text: 'Memória ROM', correct: false },
            { text: 'Memória virtual', correct: false },
            { text: 'Memória de alta velocidade entre a CPU e a RAM', correct: true },
            { text: 'Disco rígido', correct: false }
        ]
    },
    {
        question: 'Como a memória Cache funciona?',
        answers: [
            { text: 'Armazena dados permanentes', correct: false },
            { text: 'Executa cálculos matemáticos', correct: false },
            { text: 'Realiza operações de entrada e saída', correct: false },
            { text: 'Armazena dados frequentemente acessados para acesso rápido', correct: true }
        ]
    },
    {
        question: 'Como o Cache substitui os dados quando ele fica cheio?',
        answers: [
            { text: 'Usa algoritmos de substituição, como LRU (Menos Recente Utilizado)', correct: true },
            { text: 'Elimina todos os dados antigos', correct: false },
            { text: 'Sobrescreve os dados manualmente', correct: false },
            { text: 'Envia os dados para a RAM', correct: false }
        ]
    },
    {
        question: 'Como optar por qual via de Cache a ser excluída para uma nova substituição?',
        answers: [
            { text: 'Exclui a via mais cheia', correct: false },
            { text: 'Escolhe aleatoriamente', correct: false },
            { text: 'Usa algoritmos de substituição, como LRU (Menos Recente Utilizado)', correct: true },
            { text: 'Exclui a via mais vazia', correct: false }
        ]
    }
];

numPlayersSelect.addEventListener('change', handlePlayerSelection);
startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    totalQuestionsAnswered++;
    if (currentQuestionIndex >= questions.length) {
        currentPlayerIndex++;
        currentQuestionIndex = 0;
    }
    if (totalQuestionsAnswered >= questions.length * players.length) {
        showResult();
    } else {
        setNextQuestion();
    }
});
restartButton.addEventListener('click', restartGame);

function handlePlayerSelection() {
    const numPlayers = parseInt(numPlayersSelect.value);
    for (let i = 1; i <= 4; i++) {
        const playerContainer = document.getElementById(`player${i}-container`);
        if (i <= numPlayers) {
            playerContainer.classList.remove('hidden');
        } else {
            playerContainer.classList.add('hidden');
        }
    }
}

function startGame() {
    const numPlayers = parseInt(numPlayersSelect.value);
    players = [];
    for (let i = 1; i <= numPlayers; i++) {
        const playerName = document.getElementById(`player${i}`).value.trim();
        if (playerName === '') {
            alert(`Por favor, insira o nome do Jogador ${i}.`);
            return;
        }
        players.push(playerName);
    }
    scores = Array(players.length).fill(0);
    totalQuestionsAnswered = 0;
    currentPlayerIndex = 0;
    currentQuestionIndex = 0;
    startButton.classList.add('hidden');
    playerInputs.classList.add('hidden');
    currentPlayerContainer.classList.remove('hidden');
    questionContainerElement.classList.remove('hidden');
    counterContainerElement.classList.remove('hidden');
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
    updateCounters();
    updateCurrentPlayer();
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    clearStatusClass(document.body);
    nextButton.classList.add('hidden');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(selectedButton, correct);
    if (correct) {
        scores[currentPlayerIndex]++;
    }
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
        button.disabled = true;
    });
    nextButton.classList.remove('hidden');
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function updateCounters() {
    questionCounterElement.innerText = `Respondidas: ${currentQuestionIndex + 1}`;
    questionsLeftElement.innerText = `Faltam: ${questions.length - (currentQuestionIndex + 1)}`;
}

function updateCurrentPlayer() {
    currentPlayerElement.innerText = `Vez de: ${players[currentPlayerIndex]}`;
}

function showResult() {
    questionContainerElement.classList.add('hidden');
    resultContainerElement.classList.remove('hidden');
    counterContainerElement.classList.add('hidden');
    nextButton.classList.add('hidden');
    resultTextElement.innerText = `Parabéns! Você completou o quiz. Veja abaixo o placar:`;
    showScoreboard();
    showAnswersWithExplanation();
}

function showScoreboard() {
    scoreboardElement.innerHTML = '';
    players.forEach((player, index) => {
        const playerScore = document.createElement('p');
        playerScore.innerText = `${player}: ${scores[index]} ponto(s)`;
        scoreboardElement.appendChild(playerScore);
    });
}

function showAnswersWithExplanation() {
    answersWithExplanationElement.classList.remove('hidden');
    questions.forEach((question, index) => {
        const questionWithExplanation = document.createElement('div');
        questionWithExplanation.classList.add('question-with-explanation');
        const questionTitle = document.createElement('h3');
        questionTitle.innerText = `Pergunta ${index + 1}: ${question.question}`;
        questionWithExplanation.appendChild(questionTitle);
        const correctAnswer = question.answers.find(answer => answer.correct);
        const explanation = document.createElement('p');
        explanation.innerText = `Resposta Correta: ${correctAnswer.text}`;
        questionWithExplanation.appendChild(explanation);
        answersWithExplanationElement.appendChild(questionWithExplanation);
    });
}

function restartGame() {
    resultContainerElement.classList.add('hidden');
    startButton.classList.remove('hidden');
    playerInputs.classList.remove('hidden');
    currentPlayerContainer.classList.add('hidden');
    questionCounterElement.innerText = 'Respondidas: 0';
    questionsLeftElement.innerText = `Faltam: ${questions.length}`;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]]
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function restartGame() {
    resultContainerElement.classList.add('hidden');
    answersWithExplanationElement.classList.add('hidden');
    startButton.classList.remove('hidden');
    playerInputs.classList.remove('hidden');
    currentPlayerContainer.classList.add('hidden');
    questionCounterElement.innerText = 'Respondidas: 0';
    questionsLeftElement.innerText = `Faltam: ${questions.length}`;
    shuffledQuestions = shuffle(questions);
}

function initializeGame() {
    handlePlayerSelection();
    restartGame();
}

initializeGame();