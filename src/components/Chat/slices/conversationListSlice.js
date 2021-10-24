import {createSlice} from '@reduxjs/toolkit';
import {call, put, select} from 'redux-saga/effects';
import API from '../api';

export const friendListSlice = createSlice({
  name: 'friendList',
  initialState: {
    action: null,
    isLoading: false,
    error: null,
    conversations: [],
    data: {},
    currentConversation: null,
    currentTab: 'buying',
  },
  reducers: {
    selectTab(state, {payload}){
      const {tab} = payload;
      state.currentTab = tab;
    },
    selectConversation(state, {payload}) {
      const {conversation_id} = payload;
      state.currentConversation = conversation_id;
    },
    getConversationList(state, {type, payload}) {
      state.action = type;
      state.isLoading = true;
    },
    getConversationListSuccess(state, {type, payload}) {
      state.action = type;
      state.isLoading = false;
      const normalizedData = (payload.conversationList || []).reduce(
        (acc, current) => {
          acc.conversations.push(current.conversation_id);
          acc.data[current.conversation_id] = current;
          return acc;
        },
        {
          conversations: [],
          data: {},
        }
      );
      state.data = normalizedData.data;
      state.conversations = normalizedData.conversations;
      state.error = null;
    },
    getConversationListFail(state, {type, payload}) {
      state.action = type;
      state.error = payload.error;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {},
});

export const getConversationListSaga = function* (action) {
  try {
    const state = yield select();
    const type = state.conversationList.currentTab;
    const conversationList = yield call(API.getConversationList, type);
    yield put(getConversationListSuccess({conversationList}));
  } catch (err) {
    getConversationListFail({error: err});
  }
};
// export const {increment, decrement, incrementByAmount} = friendListSlice.actions;

export const {
  selectConversation,
  getConversationList,
  getConversationListSuccess,
  getConversationListFail,
  selectTab,
} = friendListSlice.actions;

export default friendListSlice.reducer;
