const sequencer = document.getElementById('sequencer');

window.addEventListener('keydown', (e) => {
   const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
   if(!audio) return;
   audio.currentTime = 0;
   audio.play();
})
sequencer.addEventListener('click', (e) => {
  if(e.target.classList.contains('beat-pad')){
     e.target.classList.toggle('active');
  };
});