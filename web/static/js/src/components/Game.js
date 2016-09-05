import React from 'react';
import { Link } from 'react-router';
import { Socket } from "phoenix"
import { withRouter } from 'react-router'

import Chat from './Chat';

const Game = React.createClass({
  setupSocket() {
    const { code: gameCode, player } = this.props.game;
    const socket =
      new Socket('/socket', {
        params: { token: window.userToken, player }
      });
    socket.connect();
    this.props.setSocket(socket);

    this.channel = socket.channel(`game:${gameCode}`);

    this.channel.join()
      .receive('ok', messages => {
        this.props.loadMessages(messages);
      })
      .receive('error', res => {
        alert('Something bad happened. Back to home!');
      });

    this.channel.on('end_game', payload => {
      alert(`${payload.player} has ended the game. ` +
            'You will be taken to the home page.');
      this.props.router.push('/');
    });
  },

  componentWillMount() {
    const { code: gameCode, player } = this.props.game;
    if (gameCode && player) {
      this.setupSocket();
    }
  },

  componentDidUpdate(nextProps, nextState) {
    const socketExists = !!Object.keys(this.props.game.socket).length;
    const { code: gameCode, player } = this.props.game;
    if (!socketExists && gameCode && player) {
      this.setupSocket();
      this.forceUpdate();
    }
  },

  componentWillUnmount() {
    this.channel.leave();
    this.props.endGame();
  },

  endGame() {
    if (confirm('End the current game?')) {
      this.channel.push('end_game');
      this.props.router.push('/');
    }
  },

  render() {
    const socketExists = !!Object.keys(this.props.game.socket).length;
    if (!socketExists) {
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
          <Chat { ...this.props } />
          <button onClick={ this.endGame }>End Game</button>
        </div>
      )
    }
  }
});

export default withRouter(Game);
