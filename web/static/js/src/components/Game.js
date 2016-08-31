import React from 'react';
import { withRouter } from 'react-router'
import { Socket } from "phoenix"
import axios from 'axios';

const Game = React.createClass({
  componentDidMount() {
    const socket = new Socket("/socket", { params: { token: window.userToken } });
    socket.connect();

    this.channel = socket.channel(`room:${this.props.params.code}`, {});
    this.channel.join()
      .receive('ok', resp => console.log('Joined successfully', resp))
      .receive('error', resp => console.log('Unable to join', resp));

    this.channel.on('new_msg', message => {
      this.props.newMessage(message);
    });
  },

  sendMessage(e) {
    e.preventDefault();
    this.channel.push('new_msg', {
      body: this.refs.messageText.value,
      timestamp: new Date()
    });
    this.refs.messageText.value = '';
  },

  endGame() {
    if (confirm('End the current game?')) {
      const requestConfig = {
        url: `/games/${this.props.params.code}`,
        method: 'DELETE',
        credentials: 'same-origin',
        headers: {
          'X-CSRF-TOKEN': document.querySelector("meta[name=csrf]").content
        }
      };

      axios(requestConfig)
        .then((res) => {
          this.props.clearMessages();
          this.props.router.push('/');
        });
    }
  },

  render() {
    return (
      <div>
        Game Code: { this.props.params.code }
        <p>Share this code with the other players</p>
        <ul>
          { this.props.messages.map((message, i) => <li key={ i }>{ message.timestamp }: { message.body }</li>) }
        </ul>
        <form onSubmit={ this.sendMessage }>
          <input ref="messageText" />
          <button type="submit">Send</button>
        </form>
        <button onClick={ this.endGame }>End Game</button>
      </div>
    )
  }
});

export default withRouter(Game);
