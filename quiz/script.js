// script.js
const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const restartButton = document.getElementById('restart-btn');
const greetingElement = document.getElementById('greeting');
const playerGreetingElement = document.getElementById('player-greeting');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const resultContainerElement = document.getElementById('result-container');
const resultTextElement = document.getElementById('result-text');
const questionCounterElement = document.getElementById('question-counter');
const questionsLeftElement = document.getElementById('questions-left');
const counterContainerElement = document.getElementById('counter-container');

let shuffledQuestions, currentQuestionIndex, correctAnswers;
let playerName = '';

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
            { text: 'Depende do processador', correct: true },
            { text: '1 segundo', correct: false },
            { text: '10 segundos', correct: false },
            { text: '100 milissegundos', correct: false }
        ]
    },
    {
        question: 'Cite exemplos de memória primária.',
        answers: [
            { text: 'RAM (Memória de Acesso Aleatório)', correct: true },
            { text: 'ROM (Memória Somente de Leitura)', correct: true },
            { text: 'Cache', correct: false },
            { text: 'HD (Disco Rígido)', correct: false }
        ]
    },
    {
        question: 'Cite exemplos de memória secundária.',
        answers: [
            { text: 'HD (Disco Rígido)', correct: true },
            { text: 'RAM (Memória de Acesso Aleatório)', correct: false },
            { text: 'ROM (Memória Somente de Leitura)', correct: false },
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
            { text: 'Memória de alta velocidade entre a CPU e a RAM', correct: true },
            { text: 'Memória ROM', correct: false },
            { text: 'Memória virtual', correct: false },
            { text: 'Disco rígido', correct: false }
        ]
    },
    {
        question: 'Como a memória Cache funciona?',
        answers: [
            { text: 'Armazena dados frequentemente acessados para acesso rápido', correct: true },
            { text: 'Armazena dados permanentes', correct: false },
            { text: 'Executa cálculos matemáticos', correct: false },
            { text: 'Realiza operações de entrada e saída', correct: false }
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
            { text: 'Usa algoritmos de substituição, como LRU (Menos Recente Utilizado)', correct: true },
            { text: 'Exclui a via mais cheia', correct: false },
            { text: 'Escolhe aleatoriamente', correct: false },
            { text: 'Exclui a via mais vazia', correct: false }
        ]
    }
];

startButton.addEventListener('click', () => {
    startGame();
});

nextButton.addEventListener('click', () => {
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        setNextQuestion();
    } else {
        if (currentQuestionIndex === questions.length - 1) {
            showResult();
        } else {
            alert('Por favor, responda todas as perguntas.');
        }
    }
});

restartButton.addEventListener('click', () => {
    startGame();
});

function startGame() {
    startButton.classList.add('hidden');
    resultContainerElement.classList.add('hidden');
    questionContainerElement.classList.remove('hidden');
    counterContainerElement.classList.remove('hidden');
    nextButton.classList.remove('hidden');
    shuffledQuestions = questions.sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    correctAnswers = 0;
    updateCounter();
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
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
    updateCounter();
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
    const correct = selectedButton.dataset.correct === 'true';
    if (correct) {
        correctAnswers++;
    }
    setStatusClass(document.body, correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === 'true');
    });
    nextButton.classList.remove('hidden');
    if (shuffledQuestions.length <= currentQuestionIndex + 1) {
        nextButton.innerText = 'Show Results';
    } else {
        nextButton.innerText = 'Next';
    }
}

function updateCounter() {
    questionCounterElement.innerText = `Respondidas: ${currentQuestionIndex + 1}`;
    questionsLeftElement.innerText = `Faltam: ${shuffledQuestions.length - currentQuestionIndex - 1}`;
}

function showResult() {
    questionContainerElement.classList.add('hidden');
    resultContainerElement.classList.remove('hidden');
    resultTextElement.innerText = `Parabéns! Você acertou ${correctAnswers} de ${questions.length} perguntas!`;
    restartButton.classList.remove('hidden');
    counterContainerElement.classList.add('hidden');
    nextButton.classList.add('hidden');
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