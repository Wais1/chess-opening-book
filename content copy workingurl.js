// Wait for the page to finish loading before running the script
window.addEventListener('load', () => {
  // Check if we're on a live game page on lichess.org
  const urlRegex = /^https:\/\/lichess\.org\/[a-zA-Z0-9]{8,}(\/white|\/black)?$/;
  if (!urlRegex.test(window.location.href)) {
    console.log('Not a valid Lichess live game URL');
    return;
  }

  console.log('Scraping moves for live game on Lichess...');

  // UCI NOTATION converter  


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

        // Convert the moves array to a string with commas every two moves
        const movesWithComma = moves.reduce((acc, move, i) => {
          if (i % 2 === 0 && i !== 0) {
            return `${acc},${move}`;
          } else {
            return `${acc}${move}`;
          }
        }, '');

        // Make an HTTP GET request to the API endpoint with the moves
        fetch(`https://explorer.lichess.ovh/masters?play=e2e4`)
          .then(response => response.json())
          .then(data => {
            console.log('Suggested moves:', data.moves);
          })
          .catch(error => {
            console.error('Failed to get suggested moves:', error);
          });
      }
    });
  });

  // Start observing the game moves container for changes
  observer.observe(gameMovesContainer, { childList: true });
});
