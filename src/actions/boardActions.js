export function fetchBoards() {
  return dispatch => {
    fetch('http://localhost:3001')
      .then(response => response.json())
      .then(boards => dispatch({ type: 'ADD_BOARDS', boards: boards }));
  };
};