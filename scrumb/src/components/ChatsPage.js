import React, { Component } from 'react';
import Cable from 'actioncable';

class ChatsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChatMessage: ''
    }
  }

  updateCurrentChatMessage(event) {
    this.setState({
      currentChatMessage: event.target.value
    });
  }

  createSocket() {
    let cable = Cable.createConsumer('ws://localhost:3001/cable');
    this.chats = cable.subscriptions.create({
      channel: 'TopicsChannel'
    }, {
      connected: (c) => {
        console.log('connected: ' + c);
      },
      received: (data) => {
        console.log('data: ' + JSON.stringify(data));
        console.log('title: ' + data.title);
      },
      create: function(chatContent) {
        this.perform('create', {
          content: chatContent
        });
      }
    });
  }

  handleSendEvent(e) {
    e.preventDefault();
    this.chats.create(this.state.currentChatMessage);
    this.setState({
      currentChatMessage: ''
    });
  }

  componentWillMount() {
    this.createSocket();
  }

  render() {
    return(
      <div className='ChatsPage'>
        <div className='stage'>
          <h1>Chats</h1>
          <div className='chat-logs'>
            <input
              type='text'
              placeholder='Enter your message ...'
              value={ this.state.currentChatMessage }
              onChange={ (e) => this.updateCurrentChatMessage(e) }
              className='chat-input' />
            <button
              onClick={ (e) => { this.handleSendEvent(e) } }
              className='send'>
              Send
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatsPage;
