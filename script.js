var startButton = document.getElementById('start-btn')
var quesContainEl = document.getElementById('qcontainer')
var randomQues, currentQues
var quesEl = document.getElementById('question')
var answerQuesEl = document.getElementById('choicebutt')
startButton.addEventListener('click', startQuiz)

function startQuiz () {
  console.log("started")
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

function answerQues () {


}

var questions = [
{
 question: 'Who starred in Black Swan?',
 answers: [
    { text: 'Natalie Portman', correct: true},
    { text: 'Blake Lively', correct: false},
 ]
}



 ]