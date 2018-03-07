const LoadKits = (function(){
   const uiInstruments = document.getElementById('instruments-container');
   const kits = {
      rock: {
         path: 'https://raw.githubusercontent.com/nickn10/beat-sequencer/master/assets/audio/rock/',
         instruments: ['KICK-1', 'KICK-2', 'SNARE-1','HHAT-1','HHAT-2','TOM-1','TOM-2','RIDE','CRASH', 'TAMBORINE', 'SHAKER']
      },
      hipHop: {
         path: 'https://raw.githubusercontent.com/nickn10/beat-sequencer/master/assets/audio/hip-hop/',
         instruments: ['KICK-1', 'KICK-2', 'SNARE-1', 'HHAT-1', 'HHAT-2', 'CLAP-1', 'PERC-1', 'PERC-2', 'PERC-3', 'CYMBAL-1', 'VOCAL-1']
      },
      house: {
         path: 'https://raw.githubusercontent.com/nickn10/beat-sequencer/master/assets/audio/house/',
         instruments: ['KICK-1', 'SNARE-1', 'CLAP-1', 'CLAP-2', 'HHAT-1', 'HHAT-2', 'PERC-1', 'PERC-2', 'CYMBAL-1', 'STAB-1', 'TOM-1']
      },
      techno: {
         path: 'https://raw.githubusercontent.com/nickn10/beat-sequencer/master/assets/audio/techno/',
         instruments: ['KICK-1', 'KICK-2', 'SNARE-1', 'SNARE-2', 'HHAT-1', 'PERC-1', 'PERC-2', 'PERC-3', 'PERC-4', 'FX-1']
      }
   }

   return (kit) => {
      uiInstruments.innerHTML = '';
      const newKit = kits[kit] || kits.rock;
      newKit.instruments.forEach((instrument, index)=> {
         const instrumentRow = document.createElement('div');
         let beat = 1;
         instrumentRow.classList = 'flex-grid instrument-row';
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
            pad.classList = `beat-${beatGrid} beat-pad btn col-${step}`
            pad.dataset.instrument = index;
            instrumentRow.appendChild(pad);
         }
         uiInstruments.appendChild(instrumentRow);
      });
   }
})();