import {call, put} from '@redux-saga/core/effects';
import {createSlice} from '@reduxjs/toolkit';
import ChatAPI from '../api';

export const myInfoSlice = createSlice({
  name: 'chat',
  initialState: {
    action: null,
    isLoading: false,
    error: null,
    conversations: {},
  },
  reducers: {
    sendMessage(state, {payload}) {
      const message = payload.messageData;
      state.conversations[message.conversation_id].messageList.push(
        message.message_id
      );
      state.conversations[message.conversation_id].messages[
        message.message_id
      ] = message;
    },
    sendMessageSuccess(state, {payload}) {
      const message = payload.messageData;
      state.conversations[message.conversation_id].messages[
        message.message_id
      ].status = 'success';
    },
    sendMessageFail(state, {payload}) {
      const message = payload.messageData;
      state.conversations[message.conversation_id].messages[
        message.message_id
      ].status = 'fail';
    },
    appendMessage(state, {payload}) {
      const {messageData} = payload;
      if (
        state.conversations &&
        state.conversations[messageData.conversation_id]
      ) {
        state.conversations[messageData.conversation_id].messageList.push(
          messageData.message_id
        );
        state.conversations[messageData.conversation_id].messages[
          messageData.message_id
        ] = messageData;
      }
    },
    getConversationMessages(state, {payload, type}) {
      const {conversation_id} = payload;
      if (!state.conversations[conversation_id]) {
        state.conversations[conversation_id] = {
          messageList: [],
          messages: {},
        };
      }
      state.isLoading = true;
      state.action = type;
    },
    getConversationMessagesSuccess(state, {payload}) {
      const {conversation_id, data} = payload;
      const normalizedData = data
        .slice()
        .reverse()
        .reduce(
          (acc, current) => {
            acc.messageList.push(current.message_id);
            acc.messages[current.message_id] = current;
            return acc;
          },
          {
            messageList: [],
            messages: {},
          }
        );
      state.conversations[conversation_id].messageList =
        normalizedData.messageList;
      state.conversations[conversation_id].messages = normalizedData.messages;
      state.isLoading = false;
      state.error = null;
    },
    getConversationMessagesFail(state, {payload}) {
      state.isLoading = false;
      state.error = payload.error;
    },
  },
});

function* getConversationMessagesSaga(action) {
  try {
    const {conversation_id, seller_id, buyer_id} = action.payload;
    const messages = yield call(ChatAPI.getMessages, {
      conversation_id,
      seller_id,
      buyer_id,
    });
    yield put(
      getConversationMessagesSuccess({
        conversation_id,
        data: messages,
      })
    );
  } catch (err) {
    yield put(getConversationMessagesFail(err));
  }
}

function* sendMessageSaga({payload}) {
  const {messageData} = payload;
  try {
    yield call(ChatAPI.sendMessage, messageData);
    yield put(sendMessageSuccess({messageData}));
  } catch (error) {
    yield put(sendMessageFail({error, messageData}));
  }
}

// export const {increment, decrement, incrementByAmount} = myInfoSlice.actions;

const {
  appendMessage,
  getConversationMessagesSuccess,
  getConversationMessages,
  getConversationMessagesFail,
  sendMessage,
  sendMessageSuccess,
  sendMessageFail,
} = myInfoSlice.actions;
export {
  appendMessage,
  getConversationMessagesSaga,
  getConversationMessages,
  sendMessageSaga,
  sendMessage,
  sendMessageSuccess,
  sendMessageFail,
};

export default myInfoSlice.reducer;
