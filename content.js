// Wait for the page to finish loading before running the script
window.addEventListener('load', () => {
    // Check if we're on a live game page on lichess.org
    const urlRegex = /^https:\/\/lichess\.org\/[a-zA-Z0-9]{8,}(\/white|\/black)?$/;
    if (!urlRegex.test(window.location.href)) {
      console.log('Not a valid Lichess live game URL');
      return;
    }
  
    console.log('Scraping moves for live game on Lichess...');
  
    // Find the game moves container element
    const gameMovesContainer = document.querySelector('l4x');
  
    // Listen for changes to the game moves
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        // Check if the game moves container has been updated
        if (mutation.type === 'childList' && mutation.target === gameMovesContainer) {
          // Get the list of moves
          const movesList = gameMovesContainer.querySelectorAll('kwdb');
          const moves = Array.from(movesList).map(move => move.textContent);
  
          // Log the list of moves to the console
          console.log('Current moves:', moves);
        }
      });
    });
  
    // Start observing the game moves container for changes
    observer.observe(gameMovesContainer, { childList: true });
  });
  