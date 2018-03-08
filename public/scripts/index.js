const sequencer = document.getElementById('sequencer');
const controlPanel = document.getElementById('controls');
const saveBtn = document.getElementById('save-pattern');
const kitSelector = document.getElementById('kit-selector');
const tempo = document.getElementById('tempo');
let currentTempo = Number(tempo.textContent);
const stepIndicators = document.querySelectorAll('.light');
let step = 0;
let play;

LoadKits();

controlPanel.addEventListener('mouseup', (e) => {
  switch (e.target.id) {
    case 'increase-tempo':
      currentTempo++;
      tempo.textContent = currentTempo;
      break;
    case 'decrease-tempo':
      currentTempo--;
      tempo.textContent = currentTempo;
      break;
    case 'clear-btn':
      document.querySelectorAll('.beat-pad').forEach(pad => pad.classList.remove('active'));
      break;
    case 'play-btn':
    case 'play-pause':
      const playPauseBtn = document.getElementById('play-pause');
      if (playPauseBtn.classList.contains('playing')) {
        playPauseBtn.innerHTML = '<i id="play-btn" class="material-icons md-large play-btn">play_arrow</i>'
        clearInterval(play);
        document.querySelectorAll(`.col-${step - 1}`).forEach(pad => pad.classList.remove('play'));
        stepIndicators.forEach(indicator => indicator.classList.remove('play'));
        step = 0;
      } else {
        playPauseBtn.innerHTML = '<i id="play-btn" class="material-icons md-large play-btn">stop</i>'
        play = setInterval(() => playSequence(), (60000 / currentTempo / 4).toFixed(4));
      }
      sequencer.dataset.playing = sequencer.dataset.playing === 'false' ? 'true' : 'false';
      playPauseBtn.classList.toggle('playing');
      break;
  }
})

kitSelector.addEventListener('input', (e) => {
  switch (e.target.value) {
    case 'rock':
      tempo.textContent = 100;
      break;
    case 'hipHop':
      tempo.textContent = 90;
      break;
    default:
      tempo.textContent = 120
      break;
  }
  currentTempo = Number(tempo.textContent);
  LoadKits(e.target.value);
})

sequencer.addEventListener('mouseup', (e) => {
  if(e.target.classList.contains('beat-pad')){
     e.target.classList.toggle('active');
  }
});

sequencer.addEventListener('mousedown', (e) => {
  if(sequencer.dataset.playing === 'true') return;
  if(e.target.classList.contains('instrument-btn')) {
    const audio = e.target.previousElementSibling;
    audio.currentTime = 0;
    audio.play();
  } else if(e.target.classList.contains('beat-pad') && !e.target.classList.contains('active')) {
    const audio = e.target.parentElement.children[0].children[0];
    audio.currentTime = 0;
    audio.play();
  }
});

function playSequence() {
  const playCol = document.querySelectorAll(`.col-${step}`);
  stepIndicators[step].classList.add('play');
  if(step - 1 < 0) {
    stepIndicators[15].classList.remove('play');
    document.querySelectorAll(`.col-${15}`).forEach(pad => pad.classList.remove('play'));
  } else {
    stepIndicators[step-1].classList.remove('play');
    document.querySelectorAll(`.col-${step - 1}`).forEach(pad => pad.classList.remove('play'));
  }
  
  playCol.forEach(pad => {
    if(pad.classList.contains('active')) {
      const audio = document.querySelector(`[data-instrument="${pad.dataset.instrument}"]`)
      pad.classList.add('play')
      audio.currentTime = 0;
      audio.play();
    }
  });
  if(step === 15) {
    step = 0;
  } else {
    step++
  }
}
