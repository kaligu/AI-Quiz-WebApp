const result = document.querySelector('.tetxarea');
const btn = document.querySelector('.btn');
const copyBtn = document.querySelector('#copyBtn');
const speechRecognition = window.webkitSpeechRecognition;
const recognition = new speechRecognition();

// recognition.continuous = true;

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
        btn.innerHTML = 'Record'
    },2000);
}

recognition.onerror = () => {
    btn.innerHTML = 'Some error occured! try again.'
    setTimeout(() => {
        btn.innerHTML = 'Record'
    },2000);
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
