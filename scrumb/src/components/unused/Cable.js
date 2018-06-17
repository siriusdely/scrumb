import React, { Fragment } from 'react';

class Cable extends React.Component {
  render = () => {
    return (
      <Fragment>
        { this.props.discussions.map(discussion => {
          this.props.cable.subscriptions.create({
            channel: 'MessagesChannel',
            discussion_id: discussion.id
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
const Cable = ({ discussions, handleReceivedMessage }) => {
  return (
    <Fragment>
    { discussions.map(discussion => {
      return (
       'cable'
      );
    }) }
    </Fragment>
  );
}
*/
export default Cable;
