/////////////////////////////////////////////////////////////////////////////////////
//      databaase
////////////////////////////////////////////////////////////////////////////////////
var quizObjList = new Array();

/////////////////////////////////////////////////////////////////////////////////////
//      Object
/////////////////////////////////////////////////////////////////////////////////////
function Quiz (id , question , correctAnswer , correctAnswerSyntaxes , userAnswer , userAnswerMarks) {
    var __id = id;
    var __question = question;
    var __correctAnswer = correctAnswer;
    var __correctAnswerSyntaxes = correctAnswerSyntaxes;
    var __userAnswer = userAnswer;
    var __userAnswerMarks = userAnswerMarks;

    this.getId = function () {
        return __id;
    }
    this.getQuestion = function () {
        return __question;
    }
    this.getCorrectAnswer = function () {
        return __correctAnswer;
    }
    this.getCorrectAnswerSyntaxes = function () {
        return __correctAnswerSyntaxes;
    }
    this.getUserAnswer = function () {
        return __userAnswer;
    }
    this.getUserAnswerMarks = function () {
        return __userAnswerMarks;
    }

    this.setId = function (newid) {
        __id = newid;
    }
    this.setQuestion = function (newquestion) {
        __question = newquestion;
    }
    this.setCorrectAnswer = function (newcorrectAnswer) {
        __correctAnswer = newcorrectAnswer;
    }
    this.setCorrectAnswerSyntaxes = function (newcorrectAnswerSyntaxes) {
        __correctAnswerSyntaxes = newcorrectAnswerSyntaxes;
    }
    this.setUserAnswer = function (newuserAnswer) {
        __userAnswer = newuserAnswer;
    }
    this.setUserAnswerMarks = function (newuserAnswerMarks) {
        __userAnswerMarks = newuserAnswerMarks;
    }

}

/////////////////////////////////////////////////////////////////////////////////////
//      Database Initialise
////////////////////////////////////////////////////////////////////////////////////
let quiz1 = new Quiz(1,'What is your pet?', 'dog' ,'kiri laki', '', 0);

/////////////////////////////////////////////////////////////////////////////////////
//      Bussiness logics
////////////////////////////////////////////////////////////////////////////////////

const result = document.querySelector('#tetxarea');
const btn = document.querySelector('#btn');
const copyBtn = document.querySelector('#copyBtn');
const speechRecognition = window.webkitSpeechRecognition;
const recognition = new speechRecognition();

recognition.onresult = (event) => {
    console.log(event.results[0][0]['transcript'])
    result.value += " "+ event.results[0][0]['transcript'];
}

recognition.onstart = () => {
    btn.innerHTML = 'Recording...'
}

recognition.onspeechend = () => {
    btn.innerHTML = 'Recording Ended.'
    setTimeout(() => {
        btn.innerHTML = '🎙 Answer'
    },2000);
}

recognition.onerror = () => {
    btn.innerHTML = 'Some error occured! try again.'
    setTimeout(() => {
        btn.innerHTML = '🎙 Answer'
    },5000);
}


btn.addEventListener('click', () => {
    recognition.start();
});

function copyText() {
    const copyText = result;
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    copyBtn.innerText = 'Copied!!'
    setTimeout(() => {
        copyBtn.innerHTML = 'Copy Text'
    },3000);
}
