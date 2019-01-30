//Init speechSynth API
const synth = window.speechSynthesis;

//DOM Elements
const textForm = document.querySelector('form')
const textInput = document.querySelector('#text-input')
const voiceSelect = document.querySelector('#voice-select')
const rate = document.querySelector('#rate')
const rateValue = document.querySelector('#rate-value')
const pitch = document.querySelector('#pitch')
const pitchValue = document.querySelector('#pitch-value')
const volume = document.querySelector('#volume')
const volumeValue = document.querySelector('#volume-value')
const body = document.querySelector('body')

//Init voices array
let voices = [];

const getVoices = () => {
	voices = synth.getVoices()
	//Loop through voices and create and option for each one
	voices.forEach(voice => {
		//Create option element
		const option = document.createElement('option')
		//Fill option with voice and language
		option.textContent = `${voice.name} (${voice.lang})`

		//set needed option attribute
		option.setAttribute('data-lang', voice.lang);
		option.setAttribute('data-name', voice.name);
		voiceSelect.appendChild(option)
	})
}

getVoices()
if(synth.onvoiceschanged !== undefined) {
	synth.onvoiceschanged = getVoices;
}

//Speak
const speak = () => {

	//check if speaking
	if(synth.speaking) {
		console.error('Already speaking...')
		return
	}
	if(textInput.value !== '') {
	//Add background animation
	body.style.background = '#141414 url(img/wave.gif)';
	body.style.backgroundRepeat = 'repeat-X';
	body.style.backgroundSize = '100% 100%';

		//Get speak text
		const speakText = new SpeechSynthesisUtterance(textInput.value);
		console.log(speakText)
		//speak end
		speakText.onend = e => {
			console.log('Done speaking...');
			body.style.background = '#141414'
		}

		//speak error
		speakText.onerror = e => {
			console.error('Something went wrong')
		}

		//selected voice
		const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name')

		//Loop through voices
		voices.forEach(voice => {
			if(voice.name === selectedVoice) {
				speakText.voice = voice
			}
		})

		//set pitch and rate
		speakText.rate = rate.value;
		speakText.pitch = pitch.value;
		speakText.volume = volume.value
		//speak
		synth.speak(speakText)
	}
}

//EVENT LISTENER	

//Text form submit
textForm.addEventListener('submit', e => {
	e.preventDefault()
	speak()
	textInput.blur()
})

//Rate value change
rate.addEventListener('change', e => rateValue.textContent = rate.value)

//Pitch value change
pitch.addEventListener('change', e => pitchValue.textContent = pitch.value)

//Volume value change
volume.addEventListener('change', e => volumeValue.textContent = volume.value)

//Voice select change
voiceSelect.addEventListener('change', e => speak())