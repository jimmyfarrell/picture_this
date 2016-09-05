import axios from 'axios';
import chance from 'chance';
import React from 'react';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router'

const Home = React.createClass({
  newGame() {
    this.code = new Chance().color({format: 'hex'}).slice(1);
    this.props.setGameCode(this.code);
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
        // TODO: Handle this error.
      });

  },

  validateGame(e) {
    e.preventDefault();

    if (!this.game) {
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
            this.enterGame();
          }
        });
    } else if (this.game.players.indexOf(this.refs.player.value) === -1) {
      this.enterGame();
    } else {
      this.refs.player.value = '';
      this.error = 'Someone in the game room already has that name.';
      this.forceUpdate()
    }
  },

  enterGame() {
    const player = this.refs.player.value;
    this.props.setPlayer(player);
    localStorage.setItem('player', player);
    this.props.router.push(`/game/${this.code}`);
  },

  render() {
    if (this.code) {
      const error = this.error ? (<p>{ this.error }</p>) : null;
      return (
        <div>
          <form onSubmit={ this.validateGame }>
            <input
              ref="player"
              placeholder="Your Name"
              defaultValue={ this.props.game.player }
              required />
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
