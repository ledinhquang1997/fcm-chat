import {createSelector} from 'reselect';

export const currentConversationSelector = (state) =>
  state.conversationList.currentConversation;

export const conversationMessagesSelector = (state) => state.chat.conversations;

export const messageListSelector = createSelector(
  [conversationMessagesSelector, currentConversationSelector],
  (conversations, currentConversation) => {
    if (
      conversations &&
      currentConversation &&
      conversations[currentConversation]
    )
      return conversations[currentConversation].messageList;
    return [];
  }
);

export const makeMessageDataSelector = () =>
  createSelector(
    (_, message_id) => message_id,
    conversationMessagesSelector,
    currentConversationSelector,
    (message_id, conversations, currentConversation) =>
      conversations[currentConversation].messages[message_id]
  );

export const myInfoSelector = (state) => state.myInfo.data;

const conversationListDataSelector = (state) => state.conversationList.data;

export const currentConversationIdSelector = (state) =>
  state.conversationList.currentConversation;

export const makeConversationDataSelector = () =>
  createSelector(
    [
      conversationListDataSelector,
      myInfoSelector,
      (_, conversationId) => conversationId,
    ],
    (conversationData, myInfo, conversationId) => {
      const {member_id} = myInfo;
      const conversationDetail = conversationData[conversationId] || {};
      if (member_id === conversationDetail.seller_id) {
        return {
          ...conversationDetail,
          receiver_first_name: conversationDetail.buyer_first_name,
          receiver_last_name: conversationDetail.buyer_last_name,
          receiver_id: conversationDetail.buyer_id,
        };
      } else {
        return {
          ...conversationDetail,
          receiver_first_name: conversationDetail.seller_first_name,
          receiver_last_name: conversationDetail.seller_last_name,
          receiver_id: conversationDetail.seller_id,
        };
      }
    }
  );

  export const currentTabSelector = state => state.conversationList.currentTab;