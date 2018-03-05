const sequencer = document.getElementById('sequencer');
const playBtn = document.getElementById('play-btn');
const controlTempo = document.getElementById('control-tempo');
const tempo = document.getElementById('tempo');
let currentTempo = Number(tempo.textContent);
const kick = document.querySelector('audio[data-key="65"]');
let start;

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
  }
});

controlTempo.addEventListener('click', (e) => {
  if(currentTempo > 60 && currentTempo < 200) {
    if (e.target.id === 'increase-tempo') {
      tempo.textContent = ++currentTempo
    } else if (e.target.id === 'decrease-tempo') {
      tempo.textContent = --currentTempo;
    }
  }
});


playBtn.addEventListener('click', () => {
  if(playBtn.classList.contains('playing')) {
    playBtn.innerHTML = '<i class="material-icons">play_arrow</i>'
    clearInterval(start);
  } else {
    playBtn.innerHTML = '<i class="material-icons">pause</i>'
    start = setInterval(() => playSequence(), (60000/currentTempo));
  }
  playBtn.classList.toggle('playing');
});


function playSequence() {
  kick.currentTime = 0;
  kick.play();
}


