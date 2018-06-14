import React, { Fragment } from 'react';
// import ActionCable from 'actioncable';

class Cable extends React.Component {
  render = () => {
    return (
      <Fragment>
      { this.props.topics.map(topic => {
        if (topic.id === 1) {
          console.log('subscriptions');
          this.props.cable.subscriptions.create({
            channel: 'MessagesChannel',
            topic_id: topic.id
          }, {
            connected: () => {
              console.log('cable connected');
            },
            received: (message) => {
              this.props.handleReceivedMessage(message);
            }
          });
        }
        return null;
      }) }
      </Fragment>
    );
  }
}

export default Cable;
