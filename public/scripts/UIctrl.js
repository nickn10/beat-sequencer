const UIctrl = (function(){
   const uiInstruments = document.getElementById('instruments-container');
   if(!NodeList.prototype.forEach && Array.prototype.forEach) {
      NodeList.prototype.forEach = Array.prototype.forEach;
   }

   const addPresetSelector = (kit, index) => {
      const presetIndex = typeof index === 'number' ? index+1 : kit.length;
      const option = document.createElement('option');
      option.setAttribute('value', `preset-${presetIndex}`);
      option.setAttribute('selected', 'selected');
      option.appendChild(document.createTextNode(`Preset ${presetIndex}`));
      presetSelector.insertBefore(option, document.getElementById('new-preset'));
   }

   const loadPresetSelectors = (genre) => {
      presetSelector.innerHTML = `
         <option value="">Presets</option>
         <option id="new-preset" value="new">New</option>`
      if(userPresets[genre].length > 0) {
         userPresets[genre].forEach((preset,index) => addPresetSelector(userPresets, index));
      }
      for (let i = 0; i < presetSelector.children.length; i++) {
         presetSelector.children[i].removeAttribute('selected');
      };
   }

   const loadPreset = (preset, genre) => {
      const presetIndex = Number(preset.slice(7)) - 1;
      document.querySelectorAll('.active').forEach(pad => pad.classList.remove('active'));
      userPresets[genre][presetIndex].forEach(pad => {
         const padArr = pad.split(',');
         document.querySelector(`.${padArr[1]}[data-instrument="${padArr[0]}"]`).classList.add('active');
      })
   }

   const loadKit = (genre) => {
      uiInstruments.innerHTML = '';
      const newKit = Kits[genre] || Kits.rock;
      newKit.instruments.forEach((instrument, index)=> {
         const instrumentRow = document.createElement('div');
         let beat = 1;
         instrumentRow.className = 'flex-grid instrument-row';
         instrumentRow.innerHTML = `
            <div class="instrument">
               <audio src="${newKit.path}${instrument.toLowerCase()}.wav" data-instrument="${index}"></audio>
               <button class="btn instrument-btn">${instrument}</button>
            </div>
         `
         for(let step=0; step < 16; step++) {
            const pad = document.createElement('div')
            let beatGrid;
            if(step < 4) {
               beatGrid = 1;
            } else if(step >= 4 && step < 8) {
               beatGrid = 2;
            } else if(step >= 8 && step < 12) {
               beatGrid = 3
            } else {
               beatGrid = 4
            }
            pad.className = `beat-${beatGrid} beat-pad btn col-${step}`
            pad.dataset.instrument = index;
            instrumentRow.appendChild(pad);
         }
         uiInstruments.appendChild(instrumentRow);
      });
   }

   return {loadKit, addPresetSelector, loadPresetSelectors, loadPreset};
})(Kits);