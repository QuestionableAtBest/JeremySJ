document.addEventListener('DOMContentLoaded', () => {
    const infoBtn = document.getElementById('infoBtn');
    const infoModal = document.getElementById('infoModal');
    const closeInfoBtn = document.getElementById('closeInfoBtn');
    const flipCoinBtn = document.getElementById('flipCoinBtn');
    const coin = document.getElementById('coin');
    const currentTallyValue = document.getElementById('currentTallyValue');
    const setSelect = document.getElementById('setSelect');
    const submitBtn = document.getElementById('submitBtn');
    
    let currentTally = 0;
    
    // Show info modal
    infoBtn.addEventListener('click', () => {
        infoModal.classList.remove('hidden');
    });
    
    // Close info modal
    closeInfoBtn.addEventListener('click', () => {
        infoModal.classList.add('hidden');
    });
    
    // Flip coin button event
    flipCoinBtn.addEventListener('click', () => {
        const swearWords = ['damn', 'hell', 'crap']; // Replace with your list
        const randomSwear = swearWords[Math.floor(Math.random() * swearWords.length)];
        coin.alt = randomSwear;
        
        // Update tally
        currentTally++;
        currentTallyValue.textContent = currentTally;
        
        // Optionally, play sound effect
        // const volume = document.getElementById('volumeSlider').value;
    });
    
    // Submit button event
    submitBtn.addEventListener('click', () => {
        // Send current tally to server
        fetch('/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                set_name: setSelect.value,
                tally: currentTally
            })
        }).then(response => response.json())
          .then(data => console.log(data));
    });
});
