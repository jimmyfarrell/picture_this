import React from 'react';
import { withRouter } from 'react-router'
import {Socket} from "phoenix"

const Game = React.createClass({
  componentDidMount() {
    const socket = new Socket("/socket", { params: { token: window.userToken } });
    socket.connect();

    this.channel = socket.channel("room:lobby", {});
    this.channel.join()
      .receive("ok", resp => { console.log("Joined successfully", resp) })
      .receive("error", resp => { console.log("Unable to join", resp) });

    this.channel.on('new_msg', payload => {
      console.log('new_msg', payload);
    });
  },

  sendMessage() {
    this.channel.push('new_msg', {
      body: this.refs.messageText.value,
      timestamp: new Date()
    });
    this.refs.messageText.value = '';
  },

  render() {
    return (
      <div>
        Game Code: { this.props.params.code }
        <p>Share this code with the other players</p>
        <input ref="messageText" />
        <button onClick={ this.sendMessage }>Send</button>
      </div>
    )
  }
});

export default withRouter(Game);
