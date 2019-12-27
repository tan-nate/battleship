import React from 'react';
import { connect } from 'react-redux';
import { fetchBoards } from '../actions/boardActions';
import Boards from '../components/Boards';

class BoardContainer extends React.Component {
  componentDidMount() {
    this.props.fetchBoards();
  }

  render() {
    return (
      <Boards boards={this.props.boards} />
    );
  }
}

const mapStateToProps = state => {
  return {
    boards: state.boards
  }
};

const mapDispatchToProps = dispatch => {
  return {
    fetchBoards: () => dispatch(fetchBoards())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardContainer);