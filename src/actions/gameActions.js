export function fetchBoards() {
  return dispatch => {
    fetch('http://localhost:3000/boards')
      .then(response => response.json())
      .then(boards => dispatch({ type: 'ADD_BOARDS', boards: boards }));
  };
};

export function fetchPoints() {
  return dispatch => {
    fetch('http://localhost:3000/points')
      .then(response => response.json())
      .then(points => dispatch({ type: 'ADD_POINTS', points: points }));
  };
};

export function sendPoints(points) {
  debugger
  let formData = {
    line: {
      point1_id: points[0].id,
      point2_id: points[1].id
    }
  }
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }, 
    body: JSON.stringify(formData)
  }
  return dispatch => {
    fetch('http://localhost:3000/lines', configObj)
      .then(response => response.json())
      .then(line => dispatch({ type: 'ADD_LINE', line: line }))
      .catch(function(error) {
        console.log(error.message);
      });
  }
}