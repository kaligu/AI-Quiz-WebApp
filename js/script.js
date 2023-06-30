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
quizObjList.push(quiz1);

let quiz2 = new Quiz(1,'What is your car?', 'toyota' ,'toyota hilux', '', 0);
quizObjList.push(quiz2);

const questionsAndAnswers = [
    {
        question: "What is Networks?",
        answer: "Networks refer to a group of interconnected devices or systems that can communicate and share resources with each other.",
    },
    {
        question: "What is Networks?",
        answer: "Networks refer to a group of interconnected devices or systems that can communicate and share resources with each other.",
    },
    // {
    //     question: "What is Networks?",
    //     answer: "Networks refer to a group of interconnected devices or systems that can communicate and share resources with each other.",
    // },
    // {
    //     question: "What is Networks?",
    //     answer: "Networks refer to a group of interconnected devices or systems that can communicate and share resources with each other.",
    // },
    // {
    //     question: "What is Networks?",
    //     answer: "Networks refer to a group of interconnected devices or systems that can communicate and share resources with each other.",
    // },
    {
        question: "What is HTML?",
        answer: "HTML stands for HyperText Markup Language, which is the standard markup language for creating web pages.",
    },
    // Add more questions and answers as needed
];

// Generate the HTML code
let htmlCode = "";
questionsAndAnswers.forEach((qa, index) => {
    $(`
    <div class="fp-con-cnt-cc">
      <div>
        <button type="button" class="btn btn-secondary">🔊 Question</button>
        <button type="button" class="btn btn-success" style="margin-left: 20px" id="btn">🎙 Answer</button>
        <button type="button" class="btn btn-primary" style="margin-left: 20px" id="submit">👉 Submit</button>
      </div>
      <div>
        <label class="form-label" style="color: white" id="lblQuestion">${index + 1}) ${qa.question}</label>
      </div>
      <div>
        <input class="form-control" id="txtareaUserAnswer" placeholder="Type here answer..." style="width: 500px">
        <label for="txtareaUserAnswer"></label>
      </div>
    </div>
  `).appendTo('.fp-con-cnt');
});

// Output the generated HTML code
console.log(htmlCode);


/////////////////////////////////////////////////////////////////////////////////////
//      Bussiness logics
////////////////////////////////////////////////////////////////////////////////////

const result = document.querySelector('#txtareaUserAnswer');
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
