//      Database
var quizObjList = [];

//      Object
function Quiz(id, question, correctAnswer, correctAnswerSyntaxes, userAnswer, userAnswerMarks) {
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

//      Database Initialise
let quiz1 = new Quiz(1, 'What is your pet?', 'dog', 'kiri laki', '', 0);
quizObjList.push(quiz1);

let quiz2 = new Quiz(2, 'What is your car?', 'toyota', 'toyota hilux', '', 0);
quizObjList.push(quiz2);

// Generate the HTML code
let htmlCode = "";
const recognitions = []; // Array to store recognition instances

quizObjList.forEach((quiz, index) => {
    const htmlElement = $(`
    <div class="fp-con-cnt-cc">
      <div>
        <button type="button" class="btn btn-secondary">🔊 Question</button>
        <button type="button" class="btn btn-success" style="margin-left: 20px" id="answerbtn${index + 1}">🎙 Answer</button>
        <button type="button" class="btn btn-primary" style="margin-left: 20px" id="submit${index + 1}">👉 Submit</button>
      </div>
      <div>
        <label class="form-label" style="color: white" id="lblQuestion">${index + 1}) ${quiz.getQuestion()}</label>
      </div>
      <div>
        <input class="form-control" id="txtareaUserAnswer${index + 1}" placeholder="Type here answer..." style="width: 500px">
        <label for="txtareaUserAnswer${index + 1}"></label>
      </div>
    </div>
  `);

    // Append the HTML element to the desired container
    htmlElement.appendTo('.fp-con-cnt');

    recognitions[index] = new webkitSpeechRecognition(); // Store recognition instance in the array

    recognitions[index].onresult = (event) => {
        console.log(event.results[0][0].transcript);
        $('#txtareaUserAnswer' + (index + 1)).val(function(_, val) {
            return val + ' ' + event.results[0][0].transcript;
        });
    };

    recognitions[index].onstart = () => {
        $('#answerbtn' + (index + 1)).text('Recording...');
    };

    recognitions[index].onspeechend = () => {
        $('#answerbtn' + (index + 1)).text('Recording Ended.');
        setTimeout(() => {
            $('#answerbtn' + (index + 1)).text('🎙 Answer');
        }, 2000);
    };

    recognitions[index].onerror = () => {
        $('#answerbtn' + (index + 1)).text('Some error occurred! Try again.');
        setTimeout(() => {
            $('#answerbtn' + (index + 1)).text('🎙 Answer');
        }, 5000);
    };

    $('#answerbtn' + (index + 1)).on('click', () => {
        recognitions[index].start();
    });

    // Add unique actions for each HTML element
    $('#submit' + (index + 1)).on('click', () => {
        // Handle submit button click action for this element
        console.log(`Submit button clicked for element ${index + 1}`);
    });
});

// Output the generated HTML code
console.log(htmlCode);





/////////////////////////////////////////////////////////////////////////////////////
//      Bussiness logics
////////////////////////////////////////////////////////////////////////////////////

// const result = document.querySelector('#txtareaUserAnswer');
// const btn = document.querySelector('#btn');
// const copyBtn = document.querySelector('#copyBtn');
// const speechRecognition = window.webkitSpeechRecognition;
// const recognition = new speechRecognition();
//
// recognition.onresult = (event) => {
//     console.log(event.results[0][0]['transcript'])
//     result.value += " "+ event.results[0][0]['transcript'];
// }
//
// recognition.onstart = () => {
//     btn.innerHTML = 'Recording...'
// }
//
// recognition.onspeechend = () => {
//     btn.innerHTML = 'Recording Ended.'
//     setTimeout(() => {
//         btn.innerHTML = '🎙 Answer'
//     },2000);
// }
//
// recognition.onerror = () => {
//     btn.innerHTML = 'Some error occured! try again.'
//     setTimeout(() => {
//         btn.innerHTML = '🎙 Answer'
//     },5000);
// }
//
//
// btn.addEventListener('click', () => {
//     recognition.start();
// });
//
// function copyText() {
//     const copyText = result;
//     copyText.select();
//     copyText.setSelectionRange(0, 99999)
//     document.execCommand("copy");
//     copyBtn.innerText = 'Copied!!'
//     setTimeout(() => {
//         copyBtn.innerHTML = 'Copy Text'
//     },3000);
// }
