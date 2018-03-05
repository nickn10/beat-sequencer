const sequencer = document.getElementById('sequencer');
const playBtn = document.getElementById('play-btn');

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
  if(e.target.tagName === 'BUTTON') {
    const audio = e.target.previousElementSibling;
    audio.currentTime = 0;
    audio.play();
  }
});

playBtn.addEventListener('click', () => {
  if(playBtn.classList.contains('playing')) {
    playBtn.innerHTML = '<i class="material-icons">play_arrow</i>'
  } else {
    playBtn.innerHTML = '<i class="material-icons">pause</i>'
  }
  playBtn.classList.toggle('playing');
})

