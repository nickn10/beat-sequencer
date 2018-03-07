const sequencer = document.getElementById('sequencer');
const playBtn = document.getElementById('play-btn');
const controlTempo = document.getElementById('control-tempo');
const tempo = document.getElementById('tempo');
const kitSelector = document.getElementById('kits');
let currentTempo = tempo.value;
const stepIndicators = document.querySelectorAll('.light');
let step = 0;
let play;

LoadKits('rock');

tempo.addEventListener('input', (e) => {
  currentTempo = e.target.value;
})

kitSelector.addEventListener('input', (e) => {
  switch (e.target.value) {
    case 'rock':
      tempo.value = 100;
      break;
    case 'hipHop':
      tempo.value = 90;
      break;
    default: 
      tempo.value = 120
      break;
  }
  currentTempo = tempo.value;
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

playBtn.addEventListener('click', () => {
  if(playBtn.classList.contains('playing')) {
    playBtn.innerHTML = '<i class="material-icons">play_arrow</i>'
    clearInterval(play);
    document.querySelectorAll(`.col-${step-1}`).forEach(pad => pad.classList.remove('play'));
    stepIndicators.forEach(indicator => indicator.classList.remove('play'));
    step = 0;
  } else {
    playBtn.innerHTML = '<i class="material-icons">pause</i>'
    play = setInterval(() => playSequence(), (60000/currentTempo/4).toFixed(4));
  }
  sequencer.dataset.playing = sequencer.dataset.playing === 'false' ? 'true' : 'false';
  playBtn.classList.toggle('playing');
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
