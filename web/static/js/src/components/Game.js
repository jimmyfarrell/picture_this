import React from 'react';
import { withRouter } from 'react-router'
import { Socket } from "phoenix"
import axios from 'axios';

import Chat from './Chat';

const Game = React.createClass({
  componentWillMount() {
    const socket = new Socket("/socket", { params: { token: window.userToken } });
    socket.connect();
    this.props.setSocket(socket);
  },

  endGame() {
    if (!confirm('End the current game?')) return;

    const requestConfig = {
      url: `/games/${this.props.params.code}`,
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        'X-CSRF-TOKEN': document.querySelector("meta[name=csrf]").content
      }
    };

    axios(requestConfig).then(res => this.props.router.push('/'));
  },

  render() {
    if (Object.keys(this.props.socket).length === 0) {
      return null;
    } else {
      return (
        <div>
          Game Code: { this.props.params.code }
          <p>Share this code with the other players</p>
          <Chat {...this.props} />
          <button onClick={ this.endGame }>End Game</button>
        </div>
      )
    }
  }
});

export default withRouter(Game);
