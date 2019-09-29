let questionNumber = 0;
let score = 0;

//generate question html
function generateQuestion () {
  if (questionNumber < Data.length) {
    return `<div class="question-${questionNumber}">
    <h2>${Data[questionNumber].question}</h2>
    <form>
    <fieldset>
    <label class="answerOption">
    <input type="radio" value="${Data[questionNumber].answers[0]}" name="answer" required>
    <span class="span">${Data[questionNumber].answers[0]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${Data[questionNumber].answers[1]}" name="answer" required>
    <span class="span" >${Data[questionNumber].answers[1]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${Data[questionNumber].answers[2]}" name="answer" required>
    <span class="span" >${Data[questionNumber].answers[2]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${Data[questionNumber].answers[3]}" name="answer" required>
    <span class="span" >${Data[questionNumber].answers[3]}</span>
    </label>
    <label class="answerOption">
    <input type="radio" value="${Data[questionNumber].answers[4]}" name="answer" required>
    <span class="span" >${Data[questionNumber].answers[4]}</span>
    </label>
    <button type="submit" class="submitButton">Submit</button>
    </fieldset>
    </form>
    </div>`;
} else {
    renderResults();
    restartQuiz();
    $('.questions').text(10)
  }
}

//increment question number
function changeQuestionNumber () {
  //if (questionNumber < Data.length) {
    questionNumber ++;
  //}
  $('.questions').text(questionNumber+1);
}

//increment score
function changeScore () {
  score ++;
}

//start quiz
//on startQuizButton click hide start div
//unhide quiz form div
function startQuiz () {
  $('.quiz').on('click', '.startButton', function (event) {
    $('.quiz').remove();
    $('.form').css('display', 'block');
    $('.questions').text(1);
});
}

// render question in DOM
function renderQuestion () {
  $('.form').html(generateQuestion());
}

//user selects answer on submit run user feedback
function userSelectAnswer () {
  $('form').on('submit', function (event) {
    event.preventDefault();
    let selected = $('input:checked');
    let answer = selected.val();
    let correctAnswer = `${Data[questionNumber].correctAnswer}`;
    if (answer === correctAnswer) {
      selected.parent().addClass('correct');
      ifAnswerIsCorrect();
    } else {
      selected.parent().addClass('wrong');
      ifAnswerIsWrong();
    }
  });
}

function ifAnswerIsCorrect () {
  userAnswerFeedbackCorrect();
  updateScore();
}

function ifAnswerIsWrong () {
  userAnswerFeedbackWrong();
}

//user feedback for correct answer
function userAnswerFeedbackCorrect () {
  let correctAnswer = `${Data[questionNumber].correctAnswer}`;
  $('.form').html(`<div class="correctFeedback"><div class="icon"><img src="${Data[questionNumber].icon}" alt="${Data[questionNumber].alt}"/></div><p><b class="feedback">You got it right!</b></p><button type=button class="nextButton">Next</button></div>`);
}

//user feedback for wrong answer
function userAnswerFeedbackWrong () {
  let correctAnswer = `${Data[questionNumber].correctAnswer}`;
  // let iconImage = `${Data[questionNumber].icon}`;
  $('.form').html(`<div class="correctFeedback"><div class="icon"><img src="wrongPx.png" alt="${Data[questionNumber].alt}" style="width:100px;hieght:100px;"/></div><p><b class="feedback">You got it wrong</b><br>the correct answer is <span>"${correctAnswer}"</span></p><button type=button class="nextButton">Next</button></div>`);
}

//update score text
function updateScore () {
  changeScore();
  $('.score').text(score);
}

//when quiz is over this is the html for the page
function renderResults () {
  if (score >= 8) {
    $('.form').html(`<div class="results correctFeedback"><img src="check.png" alt="checkmark"><h3>You're a programmer!</h3><p>You got ${score} / 10</p><p>Keep coding!</p><button class="restartButton">Restart Quiz</button></div>`);
  } else if (score < 8 && score >= 5) {
    $('.form').html(`<div class="results correctFeedback"><img src="close.png" alt="checkmark and x"><h3>Almost there!</h3><p>You got ${score} / 10</p><p>Study a little harder!</p><button class="restartButton">Restart Quiz</button></div>`);
  } else {
    $('.form').html(`<div class="results correctFeedback"><img src="fail.png" alt="clipboard with an x"><h3>Study harder</h3><p>You got ${score} / 10</p><p>We all start somewhere!</p><button class="restartButton">Restart Quiz</button></div>`);
  }
}

//what happens when the user clicks next
function renderNextQuestion () {
  $('main').on('click', '.nextButton', function (event) {
    changeQuestionNumber();
    renderQuestion();
    userSelectAnswer();
  });
}

//restart quiz function - reloads page to start quiz over
function restartQuiz () {
  $('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
}

//run quiz functions
function createQuiz () {
  startQuiz();
  renderQuestion();
  userSelectAnswer();
  renderNextQuestion();
}

$(createQuiz);
