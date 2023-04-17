// TODO:
// Fill openings list with nice openings hehe. make it in a diff folder

// Wait for the page to finish loading before running the script
window.addEventListener('load', () => {
  // Check if we're on a live game page on lichess.org
  const urlRegex = /^https:\/\/lichess\.org\/[a-zA-Z0-9]{8,}(\/white|\/black)?$/;
  if (!urlRegex.test(window.location.href)) {
    console.log('Not a valid Lichess live game URL');
    return;
  }

  // Continuously checks if score DOM element is loaded. If yes, proceed to main function. Else, keep looping. 
  const checkMovesDOMElement = () => {
    const gameMovesContainer = document.querySelector('l4x');

    if(gameMovesContainer) { 
      clearInterval(checkElementInterval)
      main()
    }
  }
  // Setup check on a timer 0.5 seconds to check if moves DOM elmeent has loaded. If has, start main functio.
  const checkElementInterval = setInterval(checkMovesDOMElement, 500)

// Function that laods after DOM element is present
const main = () => {
  console.log('Scraping moves for live game on Lichess...');

  // Known openings and complete sequences of moves
  const openings = [
    {
      name: "King's Gambit Accepted",
      moves: ['e4', 'e5', 'f4', 'exf4']
    },
    {
      name: "King's Gambit Declined",
      moves: ['e4', 'e5', 'f4', 'd6']
    },
    {
      name: "King's Gambit Declined, Classical Variation",
      moves: ['e4', 'e5', 'f4', 'Bc5']
    },
    {
      name: "King's Gambit Declined, Falkbeer Countergambit",
      moves: ['e4', 'e5', 'f4', 'd5']
    },
    {
      name: "King's Gambit Declined, Modern Variation",
      moves: ['e4', 'e5', 'f4', 'd5', 'exd5', 'Nf6']
    },
    {
      name: "King's Gambit Declined, Classical Variation, Hanham Variation",
      moves: ['e4', 'e5', 'f4', 'Bc5', 'Nf3', 'd6']
    },
    {
      name: "King's Gambit Declined, Classical Variation, Tartakower Defense",
      moves: ['e4', 'e5', 'f4', 'Bc5', 'Nf3', 'd6', 'd4', 'exd4', 'Nxd4', 'Nf6']
    },
    {
      name: "King's Gambit Declined, Classical Variation, Rare Lines",
      moves: ['e4', 'e5', 'f4', 'Bc5', 'Nf3', 'd6', 'c3']
    },
    {
      name: "King's Gambit Declined, Modern Variation, Rare Lines",
      moves: ['e4', 'e5', 'f4', 'd5', 'exd5', 'Qxd5', 'Nc3', 'Qe6+']
    },
    {
      name: "King's Gambit Declined, Classical Variation, Kieseritzky Variation",
      moves: ['e4', 'e5', 'f4', 'Bc5', 'Nf3', 'd6', 'Nc3', 'Nc6', 'Na4']
    },
    {
      name: "King's Gambit Declined, Modern Variation, Two Knights Defense",
      moves: ['e4', 'e5', 'f4', 'd5', 'exd5', 'Nf6', 'Nc3', 'Nxd5']
    },
    {
      name: "King's Gambit Declined, Modern Variation, Three Knights Gambit",
      moves: ['e4', 'e5', 'f4', 'd5', 'exd5', 'Nf6', 'Nc3', 'Bb4', 'fxe5', 'Nxd5', 'Nf3', 'Bg4']
    },
    {
      name: "King's Gambit Declined, Modern Variation, Norwalde Gambit",
      moves: ['e4', 'e5', 'f4', 'd5', 'exd5', 'Nf6', 'Nc3', 'Ne4']
    },
    {
      name: "King's Gambit Declined Modern Variation, 4...Bg4",
      moves: ['e4', 'e5', 'f4', 'd5', 'exd5', 'Nf6', 'Be2', 'Bg4']
    }, 
    {
    name: "King's Gambit Declined, Modern Variation, 4...Bf5",
    moves: ['e4', 'e5', 'f4', 'd5', 'exd5', 'Nf6', 'Nc3', 'Bf5']
    },
    {
    name: "King's Gambit Declined, Modern Variation, 4...Bc5",
    moves: ['e4', 'e5', 'f4', 'd5', 'exd5', 'Nf6', 'Nc3', 'Bc5']
    },
    {
    name: "King's Gambit Declined, Modern Variation, 4...d4",
    moves: ['e4', 'e5', 'f4', 'd5', 'exd5', 'Nf6', 'd4']
    },
    {
    name: "King's Gambit Declined, Modern Variation, 4...Nc6",
    moves: ['e4', 'e5', 'f4', 'd5', 'exd5', 'Nf6', 'Nc3']
    },
    {
    name: "King's Gambit Declined, Modern Variation, 4...Be6",
    moves: ['e4', 'e5', 'f4', 'd5', 'exd5', 'Nf6', 'Be3']
    },
    {
    name: "King's Gambit Declined, Modern Variation, 4...c6",
    moves: ['e4', 'e5', 'f4', 'd5', 'exd5', 'Nf6', 'c4']
    },
    {
    name: "King's Gambit Declined, Modern Variation, 4...Nbd7",
    moves: ['e4', 'e5', 'f4', 'd5', 'exd5', 'Nf6', 'Nf3', 'Nbd7']
    },
    {
    name: "King's Gambit Declined, Modern Variation, 4...Qxd5",
    moves: ['e4', 'e5', 'f4', 'd5', 'exd5', 'Qxd5']
    },
    {
    name: "King's Gambit Declined, Modern Variation, 4...Qh4+",
    moves: ['e4', 'e5', 'f4', 'd5', 'exd5', 'Qh4+']
    },
    {
    name: "King's Gambit Declined, Modern Variation, 4...Nf6",
    moves: ['e4', 'e5', 'f4', 'd5', 'exd5', 'Nf6']
    },
    {
    name: "King's Gambit Declined, Modern Variation, 4...Bd6",
    moves: ['e4', 'e5', 'f4', 'd5', 'exd5', 'Bd6']
    },
    {
    name: "King's Gambit Declined, Modern Variation, 4...g6",
    moves: ['e4', 'e5', 'f4', 'd5', 'exd5', 'g6']
    },
      // Add more openings here
  ];

  // Delete this, and just do the comparisons by myself in my own database. Gambits study only. compare and reference
  // Find the game moves container element
  const gameMovesBeforeLoadContainer = document.querySelector('rm6 l4x');
  const gameMovesContainer = document.querySelector('l4x');
  
  // Create flex container at bottom of page
  const myFlexContainer = document.createElement('div');
  myFlexContainer.style.display = 'flex';
  myFlexContainer.style.flexWrap = 'wrap';
  myFlexContainer.style.maxWidth = '1.7rem';


  document.body.appendChild(myFlexContainer);

  // Create list of infodiv
  var infoDivList = [];

  // Define remove infodivs from DOM function
  const removeAllInfoDiv = () => {
    infoDivList.forEach(infoDiv => infoDiv.remove());
    // Clear the infoDivList array
    infoDivList = [];
  };


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

        // Remove infodiv list after move
        removeAllInfoDiv();

        // Compare the moves array with known openings
        openings.forEach(opening => {
          const movesMatch = moves.every((move, index) => {
            return index < opening.moves.length && move === opening.moves[index];
          });

          // Just replaed (if (movesMatch) with newer
          if (movesMatch) {
            // Display the next moves in the opening sequence
            const nextMoves = opening.moves.slice(moves.length);

            // Create a div with information about the opening and next moves
            const infoDiv = document.createElement('div');
            infoDiv.innerHTML = `
              <strong>${opening.name}</strong><br>
              Next moves: ${nextMoves.join(', ')}<br>
              Current moves: ${moves.join(', ')}
            `;
            infoDiv.style.border = '1px solid black';
            infoDiv.style.padding = '10px';
            infoDiv.style.marginBottom = '10px';
            infoDiv.style.fontFamily = 'Arial, sans-serif';

            // Add to infoDivList to remove later
            infoDivList.push(infoDiv);
            
            // Add the div to a flex container at the bottom of page
            myFlexContainer.appendChild(infoDiv);
          }
        });

      }
    });
  });

  // Start observing the game moves container for changes
  observer.observe(gameMovesBeforeLoadContainer, { childList: true });
}
});
