//      Database
var quizObjListAAD = [];

//      Object
function Quiz(id, question, correctAnswer, correctAnswerSyntaxes , link1 , link2 , userAnswer, userAnswerMarks) {
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

let quizAAD1 = new Quiz(1, 'What is JCP?', '' +
    'The Java Community Process (JCP) is a mechanism to develop standard technical specifications for Java technology.' +
    '\nJCP members can give reviews, requests, and feedback to the JSR Expert group on Java platform changes using the JSR proposal.' +
    '\nAnyone can become a JCP member by filling out a form available on the JCP website.',
    ['specifications', 'JSR Expert group','JCP member']
    , 'https://www.jcp.org/en/home/index','', '',  0);
quizObjListAAD.push(quizAAD1);

let quizAAD100 = new Quiz(1, 'What is API?', '' +
    'API is a program designed to communicate between two components.' +
    '\nThe Internet is not a must.' +
    '\nAPI(A-Application-A is some application , P-Program-P is programming-code ,I-interface-I is comminunicate between two components',
    ['program', 'communicate between two components']
    , '','', '',  0);
quizObjListAAD.push(quizAAD100);

let quizAAD101 = new Quiz(2, 'What is Web API?', '' +
    '\nWeb API is a subset of API Superset.' +
    '\nWeb API is a program designed to communicate between two components by the internet',
    ['subset','program', 'communicate between two components','internet']
    , '', '','',0);
quizObjListAAD.push(quizAAD101);



$(`#nav-item-AAD-button`).on('click', () => {
    $(`#AAD-Question_page`).css('display', 'block');

    $(`#first_page`).css('display', 'none');
});

// Speak text
let speechtext = '';
let count = 1;
for (const quizobj of quizObjListAAD) {
    speechtext += 'Question ' + count;
    speechtext += quizobj.getQuestion();
    speechtext += 'Answer is';
    speechtext += quizobj.getCorrectAnswer();
    count++;
}

let currentQuestionIndex = 0;
let isSpeaking = false;
let speechsQuises = null;

function speakQuestion(index) {

    if (index >= quizObjListAAD.length) {
        $('#first_page-reading-btn').text('Speak Start');
        $('#first_page-reading-btn').prop('disabled', false);
        isSpeaking = false;
        return;
    }

    const question = speechtext.split('Question ')[index + 1]; // Skip the first empty item

    speechsQuises = new SpeechSynthesisUtterance();
    speechsQuises.text = 'Question ' + question;
    speechSynthesis.speak(speechsQuises);

    speechsQuises.addEventListener('end', () => {
        setTimeout(() => {
            if (isSpeaking) {
                speakQuestion(index + 1);


            }
        }, 2000); // Adjust the delay as needed (in milliseconds)
    });
}

$('#first_page-reading-btn').on('click', () => {
    if (!isSpeaking) {
        // Set button text to "Speaking"
        $('#first_page-reading-btn').text('Speaking... ');
        $('#first_page-reading-btn').prop('disabled', true);
        isSpeaking = true;
        speakQuestion(currentQuestionIndex);
    }
});

$('#first_page-back-btn').on('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        if (isSpeaking) {
            speechSynthesis.cancel(); // Stop speaking
            speakQuestion(currentQuestionIndex);
        }
    }
});

$('#first_page-next-btn').on('click', () => {
    if (currentQuestionIndex < quizObjListAAD.length - 1) {
        currentQuestionIndex++;
        if (isSpeaking) {
            speechSynthesis.cancel(); // Stop speaking
            speakQuestion(currentQuestionIndex);
        }
    }
});

$('#first_page-stop-btn').on('click', () => {
    if (isSpeaking) {
        isSpeaking = false;
        speechSynthesis.cancel(); // Stop speaking
        $('#first_page-reading-btn').text('Speak Start');
        $('#first_page-reading-btn').prop('disabled', false);
    }
});






// Generate the HTML code
let htmlCode = "";
const recognitions = []; // Array to store recognition instances
const speechs = []; //Array to storw speech instances

quizObjListAAD.forEach((quiz, index) => {
    const htmlElement = $(`
        <div class="col-xl-6 col-lg-6">
            <div class="card text-center" style="background-color: rgba(43,76,43,0.96); margin-top: 20px; border-radius: 5px">
                <div class="card-body ">
                    <button type="button" class="btn btn-secondary speakBtn" id="speakBtn${index + 1}">Speak Q.</button>
                    <button type="button" class="btn btn-success" style="margin-left: 5px" id="tellBtn${index + 1}"><i class="bi bi-mic"></i> Tell A.</button>
                    <br><br>
                    <h5 class="card-title" style="color: white">${index + 1}) ${quiz.getQuestion()}</h5>
                    <textarea class="form-control bg-dark" placeholder="Type Answer here..." id="userAnswertxtarea${index + 1}" style="color: white; height:145px"></textarea>
                    <label for="userAnswertxtarea${index + 1}" style="color: white">Your Answer</label>
                    <p class="card-text"></p>
                    
                    <button type="button" class="btn btn-danger btn-lg" id="sendBtn${index + 1}" style="display: block; margin-left: 50%"><i class="bi bi-send-fill"></i></button>
                    
                    <button type="button" class="btn btn-danger btn-lg" id="markBtn${index + 1}" style="display: none; margin-left: 50%">0/0</button>
                    <p class="card-text" style="color: #c5ffa4; display: none;" id="correctsyntaxestxtarea${index + 1}">syntaxes</p>
                    <button type="button" class="btn btn-warning btn-lg" id="retryBtn${index + 1}" style="display: none; margin-left: 50%;  margin-top: 10px" ><i class="bi bi-arrow-counterclockwise"></i></button>
                </div>
                <div class="card-footer text-body-secondary" style="background-color: rgba(121,121,121,0.91); display: none " id="card-footer-answers-body${index + 1}">
                    <div class="form-floating bg-dark">
                        <textarea readonly type="email" class="form-control" id="realQfootertxt${index + 1}" style="color: white; background-color: #2f2f2f; height:100px"></textarea>
                        <label for="realQfootertxt${index + 1}" style="color: #858585">Q.</label>
                    </div>
                    <div class="form-floating bg-dark">
                        <textarea readonly type="email" class="form-control" id="realAfootertxt${index + 1}" style="color: white; background-color: #2f2f2f; height:150px"></textarea>
                        <label for="realAfootertxt${index + 1}" style="color: #858585">A.</label>
                    </div>
                     <p><a class="link-offset-2" href="${quiz.getLink1()}" target="_blank" style="color: #001e97">${quiz.getLink1()}</a></p>
                     <p><a class="link-offset-2" href="${quiz.getLink2()}" target="_blank" style="color: #001e97">${quiz.getLink2()}</a></p>
                </div>
            </div>
        </div>
    `);


    //speaking button action to speak question
    htmlElement.find(`#speakBtn${index + 1}`).on('click', () => {
        // Handle submit button click action for this element
        console.log("quiz.getQuestion()");

        // Set button text to "Speaking"
        htmlElement.find(`#speakBtn${index + 1}`).text('Speaking... Q.');
        htmlElement.find(`#speakBtn${index + 1}`).prop('disabled', true);

        speechs[index+1] = new SpeechSynthesisUtterance(quiz.getQuestion());

        speechs[index+1].addEventListener('end', () => {
            // Set button text back to "Speak Q." after speaking is finished
            htmlElement.find(`#speakBtn${index + 1}`).text('Speak Q.');
            htmlElement.find(`#speakBtn${index + 1}`).prop('disabled', false);
        });

        speechSynthesis.speak(speechs[index+1]);
    });


    //when i speaking answer auto type
    recognitions[index] = new webkitSpeechRecognition(); // Store recognition instance in the array

    recognitions[index].onresult = (event) => {
        console.log(event.results[0][0].transcript);
        htmlElement.find(`#userAnswertxtarea${index + 1}`).val(function(_, val) {
            return val + ' ' + event.results[0][0].transcript;
        });
    };
    recognitions[index].onstart = () => {
        htmlElement.find(`#tellBtn${index + 1}`).text('Recording...');
    };
    recognitions[index].onspeechend = () => {
        htmlElement.find(`#tellBtn${index + 1}`).text('Recording Ended.');
        setTimeout(() => {
            htmlElement.find(`#tellBtn${index + 1}`).text('🎙 Answer');
        }, 1000);
    };
    recognitions[index].onerror = () => {
        htmlElement.find(`#tellBtn${index + 1}`).text('Some error occurred! Try again.');
        setTimeout(() => {
            htmlElement.find(`#tellBtn${index + 1}`).text('🎙 Answer');
        }, 5000);
    };
    htmlElement.find(`#tellBtn${index + 1}`).on('click', () => {
        console.log(`Submit button clicked for element ${index + 1}`);
        recognitions[index].start();
    });

    // function highlight_word(searchpara) {
    //     var text = "to";
    //     if (text) {
    //         var pattern = new RegExp("(" + text + ")", "gi");
    //         htmlElement.find(`#realAfootertxt${index + 1}`).innerHTML = searchpara.replace(pattern, "<span style='background-color: yellow'>" + text + "</span>");
    //     }
    // }


    // Load answers into the footer of the card
    htmlElement.find(`#sendBtn${index + 1}`).on('click', () => {


        htmlElement.find(`#markBtn${index + 1}`).text(countSubstringOccurrencesInArray(quiz.getCorrectAnswerSyntaxes(), $(`#userAnswertxtarea${index + 1}`).val())+"%");

        htmlElement.find(`#correctsyntaxestxtarea${index + 1}`).text(quiz.getCorrectAnswerSyntaxes());
        htmlElement.find(`#realQfootertxt${index + 1}`).val(quiz.getQuestion());
        htmlElement.find(`#realAfootertxt${index + 1}`).val(quiz.getCorrectAnswer());

        htmlElement.find(`#card-footer-answers-body${index + 1}`).css('display', 'block');
        htmlElement.find(`#markBtn${index + 1}`).css('display', 'block');
        htmlElement.find(`#correctsyntaxestxtarea${index + 1}`).css('display', 'block');
        htmlElement.find(`#retryBtn${index + 1}`).css('display', 'block');
        htmlElement.find(`#sendBtn${index + 1}`).css('display', 'none');

        htmlElement.find(`#userAnswertxtarea${index + 1}`).prop('disabled', true);
        htmlElement.find(`#speakBtn${index + 1}`).prop('disabled', true);
        htmlElement.find(`#tellBtn${index + 1}`).prop('disabled', true);
        // highlight_word(htmlElement.find(`#realAfootertxt${index + 1}`).innerHTML); //highlight correct answer syntaxes in the correct answer
    });

// Function to count the occurrences of a substring in an array of strings
    function countSubstringOccurrencesInArray(array, substring) {
        let count = 0;
        for (let i = 0; i < array.length; i++) {
            if (substring.includes(array[i])) {
                count++;
            }
        }
        count = (count / array.length) * 100;
        return count;
    }

    htmlElement.find(`#retryBtn${index + 1}`).on('click', () => {
        htmlElement.find(`#card-footer-answers-body${index + 1}`).css('display', 'none');
        htmlElement.find(`#markBtn${index + 1}`).css('display', 'none');
        htmlElement.find(`#correctsyntaxestxtarea${index + 1}`).css('display', 'none');
        htmlElement.find(`#retryBtn${index + 1}`).css('display', 'none');
        htmlElement.find(`#sendBtn${index + 1}`).css('display', 'block');

        htmlElement.find(`#userAnswertxtarea${index + 1}`).val("");

        htmlElement.find(`#userAnswertxtarea${index + 1}`).prop('disabled', false);
        htmlElement.find(`#speakBtn${index + 1}`).prop('disabled', false);
        htmlElement.find(`#tellBtn${index + 1}`).prop('disabled', false);
    });
    // Append the HTML element to the desired container
    htmlElement.appendTo('#CNS-CardHolder');
});



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
// quizObjListAAD.forEach((quiz, index) => {
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
