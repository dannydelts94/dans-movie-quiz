var startButton = document.getElementById('start-btn')
var nextButton = document.getElementById('next-btn')
var quesContainEl = document.getElementById('qcontainer')
var randomQues, currentQues
var quesEl = document.getElementById('question')
var answerQuesEl = document.getElementById('choicebutt')
startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
    currentQues++
    nextQues()
})


function startQuiz () {
  startButton.classList.add('hide')
  randomQues = questions.sort(() => Math.random() - .5)
  currentQues = 0
  quesContainEl.classList.remove('hide')
  nextQues()
}

function nextQues () {
    resetQues ()
    showQuestion(randomQues[currentQues])

}
function showQuestion(question) {
    quesEl.innerText = question.question
    question.answers.forEach(answer => {
      var aButton = document.createElement('aButton')
      aButton.innerText = answer.text
      aButton.classList.add('btn')
      if (answer.correct)  {
        aButton.dataset.correct = answer.correct
      }
      aButton.addEventListener('click', answerQues)
      answerQuesEl.appendChild(aButton)
    });
}
function resetQues() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerQuesEl.firstChild) {
        answerQuesEl.removeChild
        (answerQuesEl.firstChild)
      
}
}
function answerQues(e) {
    var answeredQues = e.target
    var correct = answeredQues.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerQuesEl.children).forEach(aButton => {
    setStatusClass(aButton, aButton.dataset.correct)
    } )
    if (randomQues.legnth > currentQues + 1) {
    nextButton.classList.remove('hide')
} else {
    startButton.innerText - 'Restart'
    startButton.classList.remove('hide')
}
}
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('incorrect')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('incorrect')
}
var questions = [
{
 question: 'Who starred in Black Swan?',
 answers: [
    { text: 'Natalie Portman', correct: true},
    { text: 'Blake Lively', incorrect: false},
    { text: 'Angelina Jolie', incorrect: false},
    { text: 'Pamela Anderson', incorrect: false},
 ]
},
{
 question: 'Who was known as the Master of Suspense?',
 answers: [
    { text: 'Martin Scorcese', incorrect: false},
    { text: 'Steven Spielberg', incorrect: false},
    { text: 'Alfred Hitchcock', correct: true},
    { text: 'Fritz Lang', incorrect: false},
 ]
}



 ]