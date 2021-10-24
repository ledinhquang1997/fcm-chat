import {takeLatest } from 'redux-saga/effects'
import { logout, logoutSaga } from '../components/Auth/slices/authSlice'
import { getConversationMessages, getConversationMessagesSaga, sendMessage, sendMessageSaga } from '../components/Chat/slices/chatSlice'
import { getConversationList, getConversationListSaga } from '../components/Chat/slices/conversationListSlice'

export default function* rootSaga(){
  yield takeLatest(getConversationList.type, getConversationListSaga)
  yield takeLatest(getConversationMessages.type, getConversationMessagesSaga)
  yield takeLatest(sendMessage.type, sendMessageSaga)
  yield takeLatest(logout.type, logoutSaga)
}