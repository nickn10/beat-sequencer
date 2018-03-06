const LoadKits = (function(){
   const sequencer = document.getElementById('sequencer');
   const kits = {
      default: {
         path: '/assets/audio/kit-1/',
         instruments: ['Kick','Snare','Bongo','HHat-1','HHat-2', 'Perc', 'Sound', 'Cymbol', 'Crash', 'Ride'],
         presets: {
            patternOne: {
               step0: [0],
               step3: [2],
               step4: [4],
               step6: [2],
               step10: [0],
               step12: [3]
            }
         },
         userPatterns: ''
      },
      test: {
         path: 'test',
         instruments: 'test',
         presetPattern: 'test',
         userPatterns: 'test'
      }
   }
   const keyCodes = {
      0: 65,
      1:83,
      2:68,
      3:70,
      4:71,
      5:72,
      6:74,
      7:75,
      8:76,
      9:186
   }

   return (kit) => {
      const newKit = kits[kit] || kits.default;
      newKit.instruments.forEach((instrument, index)=> {
         const instrumentRow = document.createElement('div');
         let beat = 1;
         instrumentRow.classList = 'flex-grid instrument-row';
         instrumentRow.innerHTML = `
            <div class="instrument">
               <audio src="${newKit.path}${instrument.toLowerCase()}.wav" data-key="${keyCodes[index]}"></audio>
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
            pad.classList = `beat-${beatGrid} beat-pad btn col-${step}`
            pad.dataset.key = keyCodes[index];
            instrumentRow.appendChild(pad);
         }
         sequencer.appendChild(instrumentRow);
      });
   }

})();