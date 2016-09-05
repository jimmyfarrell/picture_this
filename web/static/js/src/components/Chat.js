import React from 'react';
import { withRouter } from 'react-router'

const Chat = React.createClass({
  componentWillMount() {
    this.channel =
      this.props.game.socket.channel(`chat:${this.props.game.code}`);

    this.channel.join()
      .receive('ok', messages => {
        this.props.loadMessages(messages);
      })
      .receive('error', res => {
        alert('Something bad happened. Back to home!');
      });

    this.channel.on('new_msg', message => this.props.newMessage(message));

    this.channel.push('new_msg', {
      body: `${this.props.game.player} joined the room`,
      sender: 'SYSTEM',
      timestamp: new Date()
    });
  },

  componentWillUnmount() {
    this.channel.leave();
  },

  sendMessage(e) {
    e.preventDefault();
    this.channel.push('new_msg', {
      body: this.refs.messageText.value,
      timestamp: new Date()
    });
    this.refs.messageText.value = '';
  },

  render() {
    return (
      <div>
        <ul>
          { this.props.messages.map((message, i) => {
            if (message.sender === 'SYSTEM') {
              return (
                <li className="system-message" key={ i }>{ message.body }</li>
              );
            } else {
              return (
                <li key={ i }>{ message.sender }: { message.body }</li>
              );
            }
          }) }
        </ul>
        <form onSubmit={ this.sendMessage }>
          <input ref="messageText" />
          <button type="submit">Send</button>
        </form>
      </div>
    );
  }
});

export default withRouter(Chat);
