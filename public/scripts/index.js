const sequencer = document.getElementById('sequencer');
const playBtn = document.getElementById('play-btn');
const controlTempo = document.getElementById('control-tempo');
const tempo = document.getElementById('tempo');
let currentTempo = tempo.value;
const kick = document.querySelector('audio[data-key="65"]');
let step = 1;
let play;

tempo.addEventListener('input', (e) => {
  currentTempo = e.target.value;
})

window.addEventListener('keydown', (e) => {
   const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
   if(!audio) return;
   audio.currentTime = 0;
   audio.play();
})

sequencer.addEventListener('mouseup', (e) => {
  if(e.target.classList.contains('beat-pad')){
     e.target.classList.toggle('active');
  }
});

sequencer.addEventListener('mousedown', (e) => {
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
    step = 1;
  } else {
    playBtn.innerHTML = '<i class="material-icons">pause</i>'
    play = setInterval(() => playSequence(), (60000/currentTempo/4).toFixed(4));
  }
  playBtn.classList.toggle('playing');
});


function playSequence() {
  const playCol = document.querySelectorAll(`.col-${step}`);
  if(step - 1 > 0) {
    document.querySelectorAll(`.col-${step-1}`).forEach(pad => pad.classList.remove('play'));
  } else {
    document.querySelectorAll(`.col-${16}`).forEach(pad => pad.classList.remove('play'));
  }

  playCol.forEach(pad => {
    if(pad.classList.contains('active')) {
      const instrument = pad.classList[4].slice(5);
      const audio = document.querySelector(`[data-instrument="${instrument}"]`)
      pad.classList.add('play')
      audio.currentTime = 0;
      audio.play();
    }
  });

  if(step === 16) {
    step = 1;
  } else {
    step++
  }
}
