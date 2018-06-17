const locationProtocol = window.location.protocol;
const locationHostname = window.location.hostname;
const locationPort = window.location.port;
const cableUrl = (locationProtocol === 'https:' ? 'wss://' : 'ws://')
      + locationHostname + (locationPort ? (':' + window.location.port) : '')
      + '/cable';

console.log(cableUrl);

const ChatConstants = {
  CABLE_URL: cableUrl,
  GET_MESSAGES: 'GET_MESSAGES',
  GET_DISCUSSIONS: 'GET_DISCUSSIONS',
  GOT_NEW_MESSAGE: 'GOT_NEW_MESSAGE',
  GOT_NEW_DISCUSSION: 'GOT_NEW_DISCUSSION',
  MESSAGES_CHANNEL: 'MessagesChannel',
  MESSAGES_URL: '/api/v1/messages',
  DISCUSSIONS_CHANNEL: 'DiscussionsChannel',
  DISCUSSIONS_URL: '/api/v1/discussions',
}

module.exports = ChatConstants;
