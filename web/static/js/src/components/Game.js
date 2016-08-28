import React from 'react';
import { withRouter } from 'react-router'
import axios from 'axios';

const Game = React.createClass({
  render() {
    return (
      <div>
        Game Code: { this.props.params.code }
        <p>Share this code with the other players</p>
      </div>
    )
  }
});

export default withRouter(Game);
