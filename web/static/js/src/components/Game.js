import React from 'react';
import { Link } from 'react-router';
import { withRouter } from 'react-router'
import { Socket } from "phoenix"
import axios from 'axios';

import Chat from './Chat';

const Game = React.createClass({
  setupSocket() {
    const socket = new Socket("/socket", {
      params: { token: window.userToken, player: this.props.game.player }
    });
    socket.connect();
    const channel = socket.channel(`game:${this.props.game.code}`, {player: this.props.game.player});
    this.props.setSocket(socket);
    this.props.setChannel(channel);
  },

  componentWillMount() {
    if (Object.keys(this.props.game.socket).length === 0) {
      this.setupSocket();
    }
  },

  componentWillUpdate(nextProps, nextState) {
    if (Object.keys(this.props.game.socket).length === 0) {
      this.setupSocket();
    }
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
    if (Object.keys(this.props.game.socket).length === 0) {
      return null;
    } else if (!this.props.game.player) {
      return (
        <p>Invalid! <Link to="/">Go Home</Link> to Join a Game</p>
      )
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
