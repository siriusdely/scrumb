import React, { Fragment } from 'react';

class Cable extends React.Component {
  render = () => {
    return (
      <Fragment>
      { this.props.topics.map(topic => {
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
        return null;
      }) }
      </Fragment>
    );
  }
}
/*
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
*/
export default Cable;
