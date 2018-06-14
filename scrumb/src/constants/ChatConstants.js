const ChatConstants = {
  CABLE_URL: 'ws://localhost:3001/cable',
  GET_MESSAGES: 'GET_MESSAGES',
  GET_TOPICS: 'GET_TOPICS',
  GOT_NEW_MESSAGE: 'GOT_NEW_MESSAGE',
  GOT_NEW_TOPIC: 'GOT_NEW_TOPIC',
  MESSAGES_CHANNEL: 'MessagesChannel',
  MESSAGES_URL: '/api/v1/messages',
  TOPICS_CHANNEL: 'TopicsChannel',
  TOPICS_URL: '/api/v1/topics',
}

module.exports = ChatConstants;
