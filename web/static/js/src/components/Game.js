import { Socket } from "phoenix"
import React from 'react';
import { Link, withRouter } from 'react-router';

import Chat from './Chat';
import Table from './Table';

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
      .receive('error', res => {
        alert('Something bad happened. Back to home!');
      });

    this.channel.on('end_game', payload => {
      alert(`${payload.player} has ended the game. ` +
            'You will be taken to the home page.');
      this.props.router.push('/');
    });

    this.channel.on('start_game', () => {
      this.props.startGame();
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

  startGame() {
    if (confirm('Are players in the room?')) {
      this.channel.push('start_game');
    }
  },

  cancelGame() {
    if (confirm('Are you sure you want to cancel the game?')) {
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
      );
    } else if (!this.props.game.in_progress) {
      return (
        <div>
          Game Code: { this.props.params.code }
          <p>Share this code with the other players</p>
          <p>If everyone is here, you can start the game.</p>
          <button onClick={ this.startGame }>Start Game</button>
          <button onClick={ this.cancelGame }>Cancel Game</button>
          <Chat { ...this.props } />
        </div>
      );
    } else {
      return (
        <div>
          <Table { ...this.props } />
          <button onClick={ this.endGame }>End Game</button>
          <Chat { ...this.props } />
        </div>
      );
    }
  }
});

export default withRouter(Game);
