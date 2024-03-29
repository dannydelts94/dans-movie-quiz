/* variables that will be called */
var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var questionContainerElement = document.getElementById('qcontainer')
var questionElement = document.getElementById('question')
var answerButtonsElement = document.getElementById('choicebutt')
var shuffledQuestions
var currentQuestionIndex
var timeLeft = 60
/* listens for the click to start the game */
startButton.addEventListener('click', startGame)
/* listens for the click to move to the next question */
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})
/* function that operates the game's 60 second countdown timer */
function startTimer() {
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
/* function that will add a class of incorrect or correct to element and then decide what to do based on that */
function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
    document.getElementById("choicebutt").innerHTML = "Correct!"
  } else {
    element.classList.add('incorrect')
    document.getElementById("choicebutt").innerHTML = "Incorrect!";
    document.getElementById('timer').innerHTML= timeLeft - 5 + " seconds remaing";
  }
}
/* funtion that starts the game and generates random questions */
function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}
/* shuffles the questions when moving to next */
function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}
/* is populating the questions below to the page */
function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    var button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}
/* function preforms when game is reset to restart page */
function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}
/* function preformed when answer is selected allowing next button to be selected and displaying game over when final question is answered */
function selectAnswer(e) {
  var selectedButton = e.target
  var correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'GAME OVER'
    startButton.classList.remove('hide')
  }
}
/* function that will remove these values of an element */
function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('incorrect')
}

/* the questions that will populate the quiz game */
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
  },
  {
    question: 'What movie did Robert Downey Jr co star in?',
    answers: [
      { text: 'The Breakfast Club', incorrect: false },
      { text: 'Less Than Zero', correct: true },
      { text: 'Uncle Buck', incorrect: false },
      { text: 'Heathers', incorrect: false },
    ]

  },
  {
    question: 'In which state did the movie Napoleon Dynamite take place?',
    answers: [
      { text: 'Wyoming', incorrect: false },
      { text: 'Utah', incorrect: false },
      { text: 'Montana', incorrect: false },
      { text: 'Idaho', correct: true },
    ]

  }
]