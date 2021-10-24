import request from '../../utils/request';

const getConversationList = (type) => {
  return request('/v1/chat/conversations', {
    params: {
      type,
    },
  });
};

const getMessages = ({conversation_id, seller_id, buyer_id}) => {
  return request('/v1/chat/messages', {
    params: {
      conversation_id,
      seller_id,
      buyer_id,
    },
  });
};

function sendMessage(messageData) {
  return request('/v1/chat/messages', {
    method: 'post',
    data: messageData,
  });
}


const API = {
  getConversationList,
  sendMessage,
  getMessages,
};

export default API;
