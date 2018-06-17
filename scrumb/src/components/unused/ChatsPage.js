import React, { Component } from 'react';
import ActionCable from 'actioncable';
import { CABLE_URL } from '../constants/ChatConstants';

class ChatsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentChatMessage: '',
      chatLogs: []
    }
  }

  updateCurrentChatMessage(event) {
    this.setState({
      currentChatMessage: event.target.value
    });
  }

  createSocket() {
    let cable = ActionCable.createConsumer(CABLE_URL);
    this.chats = cable.subscriptions.create({
      channel: 'DiscussionsChannel'
    }, {
      connected: (c) => {
        console.log('connected: ' + c);
      },
      received: (data) => {
        // console.log('data: ' + JSON.stringify(data));
        // console.log('content: ' + data.content);
        let chatLogs = this.state.chatLogs;
        chatLogs.push(data);
        this.setState({ chatLogs: chatLogs })
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

  handleChatInputKeyPress(e) {
    if (e.key === 'Enter') {
      this.handleSendEvent(e);
    }
  }

  componentWillMount() {
    this.createSocket();
  }

  componentWillUnmount() {
    this.chats.unsubscribe();
  }

  renderChatLogs() {
    return this.state.chatLogs.map((cl) => {
      return (
        <li key={ `chat_${cl.id}` }>
          <span className='chat-message'>{ cl.topic }</span>{ ' ' }
          <span className='chat-created-at'>{ cl.created_at }</span>
        </li>
      );
    });
  }

  render() {
    return(
      <div className='ChatsPage'>
        <div className='stage'>
          <h1>Chats</h1>
          <ul className='chat-logs'>
            { this.renderChatLogs() }
          </ul>
          <input
            type='text'
            placeholder='Enter your message ...'
            value={ this.state.currentChatMessage }
            onChange={ (e) => this.updateCurrentChatMessage(e) }
            onKeyPress={ (e) => this.handleChatInputKeyPress(e) }
            className='chat-input' />
          <button
            onClick={ (e) => { this.handleSendEvent(e) } }
            className='send'>
            Send
          </button>
        </div>
      </div>
    );
  }
}

export default ChatsPage;
