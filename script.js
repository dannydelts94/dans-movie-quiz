const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('qcontainer')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('choicebutt')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})
function startTimer() {
  var timeLeft = 60;
  var timer = setInterval(function () {
    if (timeLeft <= 0) {
      clearInterval(timer);
      document.getElementById("timer").innerHTML = "GAME OVER!";
      questionContainerElement.classList.add('hide')
    } else {
      document.getElementById("timer").innerHTML = timeLeft + " seconds remaining";
    }
    timeLeft -= 1;
  }, 1000);
}
function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}


var questions = [
  {
    question: 'Who starred in Black Swan?',
    answers: [
      { text: 'Natalie Portman', correct: true },
      { text: 'Blake Lively', incorrect: false },
      { text: 'Angelina Jolie', incorrect: false },
      { text: 'Pamela Anderson', incorrect: false },
    ]
  },
  {
    question: 'Who was known as the Master of Suspense?',
    answers: [
      { text: 'Martin Scorcese', incorrect: false },
      { text: 'Steven Spielberg', incorrect: false },
      { text: 'Alfred Hitchcock', correct: true },
      { text: 'Fritz Lang', incorrect: false },
    ]
  }



]