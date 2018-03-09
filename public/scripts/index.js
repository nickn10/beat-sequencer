const sequencer = document.getElementById('sequencer');
const controlPanel = document.getElementById('controls');
const kitSelector = document.getElementById('kit-selector');
const presetSelector = document.getElementById('saved-presets');
const tempo = document.getElementById('tempo');
let currentTempo = Number(tempo.textContent);
const stepIndicators = document.querySelectorAll('.light');
const playPauseBtn = document.getElementById('play-pause');
const userPresets = JSON.parse(localStorage.getItem('presets')) || {rock:[],hipHop:[],house:[],techno:[]};
let step = 0;
let playing;

UIctrl.loadKit();
UIctrl.loadPresetSelectors('rock');

controlPanel.addEventListener('click', (e) => {
  switch (e.target.id) {
    case 'increase-tempo':
      currentTempo++;
      tempo.textContent = currentTempo;
      if(playPauseBtn.classList.contains('playing')) {
        clearInterval(playing);
        playing = setInterval(() => playSequence(), (60000 / currentTempo / 4).toFixed(4));
      }
      break;
    case 'decrease-tempo':
      currentTempo--;
      tempo.textContent = currentTempo;
      if (playPauseBtn.classList.contains('playing')) {
        clearInterval(playing);
        playing = setInterval(() => playSequence(), (60000 / currentTempo / 4).toFixed(4));
      }
      break;
    case 'clear-btn':
      document.querySelectorAll('.beat-pad').forEach(pad => pad.classList.remove('active'));
      break;
    case 'save-icon':
    case 'save-preset':
      savePreset();
      break;
    case 'delete-icon':
    case 'delete-preset':
      if(confirm('Are you sure you want to delete this preset?')) {
        userPresets[kitSelector.value].splice([Number(presetSelector.value)], 1);
        localStorage.setItem('presets', JSON.stringify(userPresets));
        UIctrl.loadPresetSelectors(kitSelector.value);
        document.querySelectorAll('.active').forEach(pad => pad.classList.remove('active'));
      }
      break;
    case 'play-btn':
    case 'play-pause':
      if (playPauseBtn.classList.contains('playing')) {
        playPauseBtn.innerHTML = '<i id="play-btn" class="material-icons md-large play-btn">play_arrow</i>'
        clearInterval(playing);
        document.querySelectorAll(`.col-${step - 1}`).forEach(pad => pad.classList.remove('play'));
        stepIndicators.forEach(indicator => indicator.classList.remove('play'));
        step = 0;
      } else {
        playPauseBtn.innerHTML = '<i id="play-btn" class="material-icons md-large play-btn">stop</i>'
        playing = setInterval(() => playSequence(), (60000 / currentTempo / 4).toFixed(4));
      }
      sequencer.dataset.playing = sequencer.dataset.playing === 'false' ? 'true' : 'false';
      playPauseBtn.classList.toggle('playing');
      break;
  }
})

presetSelector.addEventListener('input', (e) => {
  if(e.target.value === 'new') return;
  UIctrl.loadPreset(e.target.value,kitSelector.value);
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
  UIctrl.loadKit(e.target.value);
  UIctrl.loadPresetSelectors(e.target.value);
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
  stepIndicators[step].classList.add('play');
  if(step - 1 < 0) {
    stepIndicators[15].classList.remove('play');
    document.querySelectorAll(`.col-${15}`).forEach(pad => pad.classList.remove('play'));
  } else {
    stepIndicators[step-1].classList.remove('play');
    document.querySelectorAll(`.col-${step - 1}`).forEach(pad => pad.classList.remove('play'));
  }
  document.querySelectorAll(`.col-${step}`).forEach(pad => {
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

function savePreset() {
  if(!!presetSelector.value) {
    const kit = userPresets[kitSelector.value];
    const newPreset = []
    document.querySelectorAll('.active').forEach(pad => {
      newPreset.push(`${pad.dataset.instrument},${pad.classList[3]}`);
    });
    if (presetSelector.value === 'new') {
      if(newPreset.length < 1) return;
      for (let i = 0; i < presetSelector.children.length; i++) {
        presetSelector.children[i].removeAttribute('selected');
      }
      kit.push(newPreset);
      UIctrl.addPresetSelector(kit);
    } else {
      if(confirm('Are you sure you want to overwrite this preset?')) {
        const presetNum = Number(presetSelector.value.slice(7));
        kit[presetNum - 1] = newPreset;
      }
    }
    localStorage.setItem('presets', JSON.stringify(userPresets));
  }
}
