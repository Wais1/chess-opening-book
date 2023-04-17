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
  // Delete this, and just do the comparisons by myself in my own database. Gambits study only. compare and reference
  function algebraicToUci(move) {
    const files = 'abcdefgh';
    const ranks = '12345678';
  
    // Castling
    if (move === 'O-O') {
      return move.includes('white') ? 'e1g1' : 'e8g8';
    } else if (move === 'O-O-O') {
      return move.includes('white') ? 'e1c1' : 'e8c8';
    }
  
    const isCapture = move.includes('x');
    const moveWithoutCapture = isCapture ? move.replace('x', '') : move;
    const piece = moveWithoutCapture.match(/[A-Z]/);
    const isPawnMove = !piece;
  
    let file, rank, originFile, originRank, promotion;
    if (isPawnMove) {
      [file, rank] = moveWithoutCapture.match(/[a-h][1-8]/)[0].split('');
      originFile = file;
      originRank = rank === '1' ? '2' : '7';
  
      if (move.length === 5) {
        promotion = move.charAt(4);
      }
    } else {
      [file, rank] = moveWithoutCapture.match(/[a-h][1-8]/)[0].split('');
      originFile = moveWithoutCapture.match(/([a-h])(?=[1-8])/)[0];
      originRank = moveWithoutCapture.match(/(?<=[a-h])[1-8]/)[0];
    }
  
    return `${originFile}${originRank}${file}${rank}${promotion || ''}`;
  }

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

        const uciMoves = moves.map(algebraicToUci);
        const uciString = uciMoves.join(',');
        console.log('Uci string:', uciString)

        // use e2e4 for testing
        // Make an HTTP GET request to the API endpoint with the moves
        fetch(`https://explorer.lichess.ovh/masters?play=${uciString}`)
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
