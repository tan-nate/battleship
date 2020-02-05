export function fetchGuesses() {
  return dispatch => {
    fetch('/guesses')
      .then(response => response.json())
      .then(guesses => dispatch({ type: 'ADD_GUESSES', guesses: guesses }));
  };
};

export function sendGuess({ points, board }) {
  let formData = {
    guess: {
      point1_id: points[0].id,
      point2_id: points[1].id,
      board_id: board
    }
  };

  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }, 
    body: JSON.stringify(formData)
  };

  return dispatch => {
    fetch('/guesses', configObj)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Connected points must be adjacent");
        }
      })
      .then(guess => dispatch({ type: 'ADD_GUESS', guess: guess }))
      .catch(error => {
        console.log(error);
      });
  };
};

export function storeGuessPointPosition(point) {
  return dispatch => dispatch({ type: 'STORE_GUESS_POINT_POSITION', point: point });
};