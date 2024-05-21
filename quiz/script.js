// script.js
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

let shuffledQuestions, currentQuestionIndex, correctAnswers;

const questions = [
    {
        question: 'Qual é a capital da França?',
        answers: [
            { text: 'Paris', correct: true },
            { text: 'Londres', correct: false },
            { text: 'Berlim', correct: false },
            { text: 'Madrid', correct: false }
        ]
    },
    {
        question: 'Quem pintou a Mona Lisa?',
        answers: [
            { text: 'Leonardo da Vinci', correct: true },
            { text: 'Vincent Van Gogh', correct: false },
            { text: 'Pablo Picasso', correct: false },
            { text: 'Claude Monet', correct: false }
        ]
    },
    {
        question: 'Qual é o maior planeta do nosso sistema solar?',
        answers: [
            { text: 'Júpiter', correct: true },
            { text: 'Saturno', correct: false },
            { text: 'Urano', correct: false },
            { text: 'Netuno', correct: false }
        ]
    },
    {
        question: 'Em que ano o homem pisou na Lua pela primeira vez?',
        answers: [
            { text: '1969', correct: true },
            { text: '1959', correct: false },
            { text: '1979', correct: false },
            { text: '1989', correct: false }
        ]
    }
    // Adicione mais perguntas conforme necessário
];

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        currentQuestionIndex++;
        setNextQuestion();
    } else {
        showResult();
    }
});
restartButton.addEventListener('click', startGame);

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
    questionCounterElement.innerText = `Respondidas: ${currentQuestionIndex}`;
    questionsLeftElement.innerText = `Faltam: ${shuffledQuestions.length - currentQuestionIndex - 1}`;
}

function showResult() {
    questionContainerElement.classList.add('hidden');
    resultContainerElement.classList.remove('hidden');
    resultTextElement.innerText = `Você acertou ${correctAnswers} de ${questions.length} perguntas!`;
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
