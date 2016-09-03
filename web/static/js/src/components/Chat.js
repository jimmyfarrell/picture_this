import React from 'react';
import { withRouter } from 'react-router'
import { Socket } from "phoenix"
import axios from 'axios';

const Chat = React.createClass({
  componentDidMount() {
    this.channel = this.props.socket.channel(`room:${this.props.game.code}`, {});
    this.channel.join()
      .receive('ok', resp => {
        this.channel.push('new_msg', {
          body: `${this.props.game.player} joined the room`,
          sender: 'SYSTEM',
          timestamp: new Date(),
          game_code: this.props.game.code
        });
      })
      .receive('error', resp => console.log('Unable to join'));
    this.channel.on('new_msg', message => this.props.newMessage(message));
  },

  componentWillUnmount() {
    this.props.clearMessages();
  },

  sendMessage(e) {
    e.preventDefault();
    this.channel.push('new_msg', {
      body: this.refs.messageText.value,
      sender: this.props.game.player,
      timestamp: new Date(),
      game_code: this.props.game.code
    });
    this.refs.messageText.value = '';
  },

  render() {
    return (
      <div>
        <ul>
          { this.props.messages.map((message, i) => {
            if (message.sender === 'SYSTEM') {
              return (<li class="system-message" key={ i }>{ message.body }</li>)
            } else {
              return (<li key={ i }>{ message.sender }: { message.body }</li>)
            }
          }) }
        </ul>
        <form onSubmit={ this.sendMessage }>
          <input ref="messageText" />
          <button type="submit">Send</button>
        </form>
      </div>
    )
  }
});

export default withRouter(Chat);
