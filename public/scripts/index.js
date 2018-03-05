const sequencer = document.getElementById('sequencer');

sequencer.addEventListener('click', (e) => {
  if(e.target.classList.contains('beat-pad')){
     e.target.classList.toggle('active');
  };
});