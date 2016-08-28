import React from 'react';
import shortid from 'shortid';

const Main = React.createClass({
  render() {
    return (
      <div>
        { React.cloneElement(this.props.children, this.props) }
      </div>
    )
  }
});

export default Main;
