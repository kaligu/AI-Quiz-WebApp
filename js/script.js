//      Database
var quizObjList = [];

//      Object
function Quiz(id, question, correctAnswer, correctAnswerSyntaxes, link1 , link2 , userAnswer, userAnswerMarks) {
    var __id = id;
    var __question = question;
    var __correctAnswer = correctAnswer;
    var __correctAnswerSyntaxes = correctAnswerSyntaxes;
    var __link1 = link1;
    var __link2 = link2;
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
    this.getLink1 = function () {
        return __link1;
    }
    this.getLink2 = function () {
        return __link2;
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
    this.setLink1 = function (newlink1) {
        __link1 = newlink1;
    }
    this.setLink2 = function (newlink2) {
        __link2 = newlink2;
    }
}

//      Database Initialise
let quiz1 = new Quiz(1, 'What is your pet?', 'dog', 'kiri laki', '','', '',  0);
quizObjList.push(quiz1);

let quiz2 = new Quiz(2, 'What is your car?', 'toyota', 'toyota hilux', '', '','',0);
quizObjList.push(quiz2);

// Generate the HTML code
let htmlCode = "";
const recognitions = []; // Array to store recognition instances

quizObjList.forEach((quiz, index) => {
    const htmlElement = $(`
        <div class="col-xl-6 col-lg-6">
            <div class="card text-center" style="background-color: rgba(43,76,43,0.96); margin-top: 20px; border-radius: 5px">
                <div class="card-body ">
                    <button type="button" class="btn btn-secondary speakBtn" id="speakBtn${index + 1}">Speak Q.</button>
                    <button type="button" class="btn btn-success" style="margin-left: 5px"><i class="bi bi-mic"></i> Tell A.</button>
                    <br><br>
                    <h5 class="card-title" style="color: white">${index + 1}) ${quiz.getQuestion()}</h5>
                    <textarea class="form-control bg-dark" placeholder="Type Answer here..." id="floatingTextarea" style="color: white"></textarea>
                    <label for="floatingTextarea" style="color: white">Your Answer</label>
                    <p class="card-text"></p>
                    <a href="#" class="btn btn-danger btn-lg" id="card-body-submit"><i class="bi bi-send-fill"></i></a>
                    <a href="#" class="btn btn-danger btn-lg" id="card-body-marks">0/0</a>
                    <p class="card-text" style="color: #c84848" id="card-body-syntaxes">syntaxes</p>
                    <a href="#" class="btn btn-warning btn-lg" style="margin-left: 5px" id="card-body-retry"><i class="bi bi-arrow-counterclockwise"></i></a>
                </div>
                <div class="card-footer text-body-secondary" style="background-color: rgba(121,121,121,0.91)" id="card-footer-answers-body">
                    <div class="form-floating bg-dark">
                        <input readonly type="email" class="form-control" id="floatingInputGrid" placeholder="name@example.com" value="mdo@example.com" style="color: white; background-color: #2f2f2f">
                        <label for="floatingInputGrid" style="color: #858585">Q.</label>
                    </div>
                    <div class="form-floating bg-dark">
                        <input readonly type="email" class="form-control" id="floatingInputGrid1" placeholder="name@example.com" value="mdo@example.com" style="color: white; background-color: #2f2f2f">
                        <label for="floatingInputGrid1" style="color: #858585">Q.</label>
                        <p><a class="link-offset-2" href="https://kaligu.github.io/MyProfile/" target="_blank">https://kaligu.github.io/MyProfile/</a></p>
                        <p><a class="link-offset-2" href="" target="_blank"></a></p>
                    </div>
                </div>
            </div>
        </div>
    `);

    console.log(`#speakBtn${index + 1}`);
    htmlElement.find(`#speakBtn${index + 1}`).on('click', () => {
        // Handle submit button click action for this element
        console.log("quiz.getQuestion()");

        const speakButton = htmlElement.find(`#speakBtn${index + 1}`);

        // Set button text to "Speaking"
        speakButton.text('Speaking... Q.');
        speakButton.prop('disabled', true);

        const speech = new SpeechSynthesisUtterance(quiz.getQuestion());

        speech.addEventListener('end', () => {
            // Set button text back to "Speak Q." after speaking is finished
            speakButton.text('Speak Q.');
            speakButton.prop('disabled', false);
        });

        speechSynthesis.speak(speech);
        console.log("quiz.getQuestion()");
    });



    // Append the HTML element to the desired container
    htmlElement.appendTo('#CNS-CardHolder');

    // recognitions[index] = new webkitSpeechRecognition(); // Store recognition instance in the array
    //
    // recognitions[index].onresult = (event) => {
    //     console.log(event.results[0][0].transcript);
    //     $('#txtareaUserAnswer' + (index + 1)).val(function(_, val) {
    //         return val + ' ' + event.results[0][0].transcript;
    //     });
    // };
    //
    // recognitions[index].onstart = () => {
    //     $('#answerbtn' + (index + 1)).text('Recording...');
    // };
    //
    // recognitions[index].onspeechend = () => {
    //     $('#answerbtn' + (index + 1)).text('Recording Ended.');
    //     setTimeout(() => {
    //         $('#answerbtn' + (index + 1)).text('🎙 Answer');
    //     }, 2000);
    // };
    //
    // recognitions[index].onerror = () => {
    //     $('#answerbtn' + (index + 1)).text('Some error occurred! Try again.');
    //     setTimeout(() => {
    //         $('#answerbtn' + (index + 1)).text('🎙 Answer');
    //     }, 5000);
    // };
    //
    // $('#answerbtn' + (index + 1)).on('click', () => {
    //     recognitions[index].start();
    // });
    //
    // // Add unique actions for each HTML element
    // $('#submit' + (index + 1)).on('click', () => {
    //     // Handle submit button click action for this element
    //     console.log(`Submit button clicked for element ${index + 1}`);
    // });
});

// Output the generated HTML code

// <div className="fp-con-cnt-cc">
//     <div>
//         <button type="button" className="btn btn-secondary">🔊 Question</button>
//         <button type="button" className="btn btn-success" style="margin-left: 20px" id="answerbtn${index + 1}">🎙
//             Answer
//         </button>
//         <button type="button" className="btn btn-primary" style="margin-left: 20px" id="submit${index + 1}">👉 Submit
//         </button>
//     </div>
//     <div>
//         <label className="form-label" style="color: white" id="lblQuestion">${index + 1}) ${quiz.getQuestion()}</label>
//     </div>
//     <div>
//         <input className="form-control" id="txtareaUserAnswer${index + 1}" placeholder="Type here answer..."
//                style="width: 500px">
//             <label htmlFor="txtareaUserAnswer${index + 1}"></label>
//     </div>
// </div>



/////////////////////////////////////////////////////////////////////////////////////
//      Bussiness logics
////////////////////////////////////////////////////////////////////////////////////
//
// const txtareaUserAnswerlbl = $('.txtareaUserAnswerlbl');
// const result = document.querySelector('#txtareaUserAnswer');
// const btn = document.querySelector('#btn');
// const questionBtn = document.querySelector('#questionbtn');
// const lblQuestion = document.querySelector('#lblQuestion');
// const speechRecognition = window.webkitSpeechRecognition;
// const recognition = new speechRecognition();
//
//
// const CountofAnswers = document.querySelector('#lblCountofAnswers');
// const correctAnswerSyntaxes = ['cat', 'pet'];
// const submitbtn = document.querySelector('#submit');
//
// // Function to count the occurrences of a substring in an array of strings
// function countSubstringOccurrencesInArray(array, substring) {
//     let count = 0;
//     for (let i = 0; i < array.length; i++) {
//         if (substring.includes(array[i])) {
//             count++;
//         }
//     }
//     return count;
// }
//
// function highlightOccurrences(text, keywords) {
//     keywords.forEach(keyword => {
//         console.log(keyword);
//         text = text.replace(keyword, '<span style="color: yellow;">${keyword}</span>');
//     });
//     return text;
// }
//
// submitbtn.addEventListener('click', () => {
//     txtareaUserAnswerlbl.innerHTML = highlightOccurrences(result.value, correctAnswerSyntaxes);
//
//     CountofAnswers.textContent = countSubstringOccurrencesInArray(correctAnswerSyntaxes, result.value);
// });
//
//
//
// questionBtn.addEventListener('click', () => {
//     const text = lblQuestion.textContent;
//
//     // Set button text to "Speaking"
//     questionBtn.textContent = 'Speaking...';
//     questionBtn.disabled = true;
//
//     const speech = new SpeechSynthesisUtterance(text);
//
//     speech.addEventListener('end', () => {
//         // Set button text back to "Question" after speaking is finished
//         questionBtn.textContent = '🔊 Question';
//         questionBtn.disabled = false;
//     });
//
//     speechSynthesis.speak(speech);
// });
//
//
//
//
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




// let htmlCode = "";
// const recognitions = []; // Array to store recognition instances
//
// quizObjList.forEach((quiz, index) => {
//     const htmlElement = $(`
//     <div class="fp-con-cnt-cc">
//       <div>
//         <button type="button" class="btn btn-secondary">🔊 Question</button>
//         <button type="button" class="btn btn-success" style="margin-left: 20px" id="answerbtn${index + 1}">🎙 Answer</button>
//         <button type="button" class="btn btn-primary" style="margin-left: 20px" id="submit${index + 1}">👉 Submit</button>
//       </div>
//       <div>
//         <label class="form-label" style="color: white" id="lblQuestion">${index + 1}) ${quiz.getQuestion()}</label>
//       </div>
//       <div>
//         <input class="form-control" id="txtareaUserAnswer${index + 1}" placeholder="Type here answer..." style="width: 500px">
//         <label for="txtareaUserAnswer${index + 1}"></label>
//       </div>
//     </div>
//   `);
//
//     // Append the HTML element to the desired container
//     htmlElement.appendTo('.fp-con-cnt');
//
//     recognitions[index] = new webkitSpeechRecognition(); // Store recognition instance in the array
//
//     recognitions[index].onresult = (event) => {
//         console.log(event.results[0][0].transcript);
//         $('#txtareaUserAnswer' + (index + 1)).val(function(_, val) {
//             return val + ' ' + event.results[0][0].transcript;
//         });
//     };
//
//     recognitions[index].onstart = () => {
//         $('#answerbtn' + (index + 1)).text('Recording...');
//     };
//
//     recognitions[index].onspeechend = () => {
//         $('#answerbtn' + (index + 1)).text('Recording Ended.');
//         setTimeout(() => {
//             $('#answerbtn' + (index + 1)).text('🎙 Answer');
//         }, 2000);
//     };
//
//     recognitions[index].onerror = () => {
//         $('#answerbtn' + (index + 1)).text('Some error occurred! Try again.');
//         setTimeout(() => {
//             $('#answerbtn' + (index + 1)).text('🎙 Answer');
//         }, 5000);
//     };
//
//     $('#answerbtn' + (index + 1)).on('click', () => {
//         recognitions[index].start();
//     });
//
//     // Add unique actions for each HTML element
//     $('#submit' + (index + 1)).on('click', () => {
//         // Handle submit button click action for this element
//         console.log(`Submit button clicked for element ${index + 1}`);
//     });
// });
//
// // Output the generated HTML code
// console.log(htmlCode);
