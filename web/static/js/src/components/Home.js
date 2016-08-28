import React from 'react';
import { withRouter } from 'react-router'
import { push } from 'react-router-redux';
import shortid from 'shortid';
import axios from 'axios';

const Home = React.createClass({
  newGame() {
    const code = shortid.generate();
    const requestConfig = {
      url: '/games',
      method: 'POST',
      data: { code },
      credentials: 'same-origin',
      headers: {
        'X-CSRF-TOKEN': document.querySelector("meta[name=csrf]").content
      }
    };

    axios(requestConfig)
      .then((res) => {
        if (res.status === 201) {
          this.props.router.push(`/game/${code}`);
        }
      });
  },

  joinGame(e) {
    e.preventDefault();
    const code = this.refs.code.value;
    const requestConfig = {
      url: `/games/${code}`,
      method: 'GET'
    };

    axios(requestConfig)
      .then((res) => {
        this.props.router.push(`/game/${code}`);
        this.refs.code.value = '';
      }).catch((err) => {
      });

  },

  render() {
    return (
      <div>
        <button onClick={ this.newGame }>New Game</button>
        <form id="joinGameForm" onSubmit={ this.joinGame }>
          <input ref="code" name="code" placeholder="Enter Game Code" required/>
          <button type="submit">Join Game</button>
        </form>
      </div>
    )
  }
});

export default withRouter(Home);
