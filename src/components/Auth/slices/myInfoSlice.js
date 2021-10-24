import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {getConversationList} from '../../Chat/slices/conversationListSlice';
import {getMyInfo as getMyInfoRequest} from '../api';

const getMyInfo = createAsyncThunk(
  'auth/getUserInfo',
  async (userData, {rejectWithValue, dispatch}) => {
    try {
      const data = await getMyInfoRequest();
      dispatch(getConversationList());
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const myInfoSlice = createSlice({
  name: 'auth',
  initialState: {
    action: null,
    isLoading: false,
    error: null,
    data: {},
  },
  extraReducers: (builder) => {
    builder.addCase(getMyInfo.pending, (state, {type, payload}) => {
      state.isLoading = true;
      state.action = type;
    });
    builder.addCase(getMyInfo.fulfilled, (state, {type, payload}) => {
      state.action = type;
      state.data = payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(getMyInfo.rejected, (state, action) => {
      state.action = action.type;
      if (action.payload) {
        state.isLoading = false;
        state.error = action.payload;
      } else {
        state.error = action.error.message;
      }
    });
  },
});

// export const {increment, decrement, incrementByAmount} = myInfoSlice.actions;

export {getMyInfo};

export default myInfoSlice.reducer;
