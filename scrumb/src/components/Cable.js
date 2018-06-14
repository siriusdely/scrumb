import React, { Fragment } from 'react';
// import ActionCable from 'actioncable';

const Cable = ({ topics, handleReceivedMessage }) => {
  return (
    <Fragment>
      { topics.map(topic => {
        return (
          'cable'
        );
      }) }
    </Fragment>
  );
}

export default Cable;
