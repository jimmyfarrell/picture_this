import React from 'react';
import { withRouter } from 'react-router'
import { push } from 'react-router-redux';
import shortid from 'shortid';
import axios from 'axios';

const Home = React.createClass({
  newGame() {
    this.code = shortid.generate();
    const requestConfig = {
      url: '/games',
      method: 'POST',
      data: { code: this.code },
      credentials: 'same-origin',
      headers: {
        'X-CSRF-TOKEN': document.querySelector("meta[name=csrf]").content
      }
    };

    axios(requestConfig)
      .then((res) => {
        if (res.status === 201) {
          this.game = res.data.data;
          this.props.setGameCode(this.code);
        }
      });
  },

  joinGame(e) {
    e.preventDefault();
    this.code = this.refs.code.value;
    const requestConfig = {
      url: `/games/${this.code}`,
      method: 'GET'
    };

    axios(requestConfig)
      .then((res) => {
        this.game = res.data.data;
        this.refs.code.value = '';
        this.props.setGameCode(this.code);
      }).catch((err) => {
      });

  },

  enterGame(e) {
    e.preventDefault();
    const player = this.refs.player.value;
    if (!this.game.players || this.game.players.indexOf(player) === -1) {
      this.props.setPlayer(player);
      this.props.router.push(`/game/${this.code}`);
    } else {
      this.refs.player.value = '';
      this.error = 'Someone in the game room already has that name.';
      this.forceUpdate()
    }
  },

  render() {
    if (this.code) {
      const error = this.error ? (<p>{ this.error }</p>) : null;
      return (
        <div>
          <form onSubmit={ this.enterGame }>
            <input ref="player" placeholder="Your Name" value={ this.props.player } required />
            <button type="submit">Enter Game Room</button>
          </form>
          { error }
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={ this.newGame }>New Game</button>
          <form onSubmit={ this.joinGame }>
            <input ref="code" placeholder="Enter Game Code" required />
            <button type="submit">Join Game</button>
          </form>
        </div>
      );
    }
  }
});

export default withRouter(Home);
