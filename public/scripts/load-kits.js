const LoadKits = (function(){
   const uiInstruments = document.getElementById('instruments-container');
   if(!NodeList.prototype.forEach && Array.prototype.forEach) {
      NodeList.prototype.forEach = Array.prototype.forEach;
   }
   return (genre) => {
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
})(Kits);