import React from 'react';
import TestTwo from './TestTwo';

const Card = React.createClass({
  render() {
    return (
      <div className="card">
        Cards: { this.props.table.cards }
        <button onClick={ this.props.incrementCards.bind(null) }>Increment</button>
      </div>
    )
  }
});

export default Card;
