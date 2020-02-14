import React from 'react';
import ActionCable from 'actioncable';

import { connect } from 'react-redux';
import { fetchPlayers, addPlayer, removePlayer } from '../../actions/playerActions';

class Players extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
    };
  }
  
  componentDidMount() {
    this.props.fetchPlayers();
    // change to 'wss://fuddll.herokuapp.com/cable' in production
    // change to 'ws://localhost:3000/cable' in development
    const cable = ActionCable.createConsumer('ws://localhost:3000/cable');
    cable.subscriptions.create("PlayersChannel", {
      received: (response) => {this.handleReceived(response)},
    });
  }
  
  handleReceived = response => {
    const player = JSON.parse(response);
    if (!player.logged_in) {
      this.props.removePlayer(player);
    } else {
      this.props.addPlayer(player);
    }
  }

  renderPlayers = () => {
    if (this.props.players.length > 0) {
      return (
        <ul>
          {this.props.players.map(player => <li key={player.id}>{player.name}</li>)}
        </ul>
      );
    }
  };

  render() {
    return (
      <div className="players-list">
        {this.renderPlayers()}
      </div>
    );
  }
}

const mapStateToProps = ({ players }) => ({
  players: players.players,
});

const mapDispatchToProps = dispatch => {
  return {
    fetchPlayers: () => dispatch(fetchPlayers()),
    addPlayer: player => dispatch(addPlayer(player)),
    removePlayer: player => dispatch(removePlayer(player)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Players);