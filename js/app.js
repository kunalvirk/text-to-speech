const msg = new SpeechSynthesisUtterance();
const txt = document.querySelector('#speechTxt').textContent;
const selectVoices = document.querySelector('#selectVoice');
const startSpeech = document.querySelector("#listen");
const stopSpeech = document.querySelector('#stop');
const options = document.querySelectorAll('input[type="range"]');

let voices;

msg.text = txt.trim();

function populateVoices() {
    voices = this.getVoices();
    selectVoices.innerHTML = voices
                             .filter(voice => voice.lang.includes("en"))
                             .map(option => `<option value="${option.name}">${option.name}</option>`)
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);

function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
        speechSynthesis.speak(msg);
    }
}

function setOptions() {
    console.log("RESETTING VALUES")
    msg[this.name] = this.value;
    toggle()
}

function voiceChange() {
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle();
}

selectVoices.addEventListener('change', voiceChange)
startSpeech.addEventListener('click', toggle)
stopSpeech.addEventListener('click', () => toggle(false))
options.forEach(opt => opt.addEventListener('change', setOptions))

console.log(msg)

