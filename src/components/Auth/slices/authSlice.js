import { call, put } from "@redux-saga/core/effects";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteCurrentRegistrationToken,
  generateNewToken,
  getRegistrationToken,
  sendTokenToServer,
} from "../../../services/fcmService";
import { updateAccessToken } from "../../../utils/request";
import { login as loginRequest, logoutRequest } from "../api";

const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const { username, password } = userData;
      const response = await loginRequest(username, password);
      updateAccessToken(response.token);
      await generateNewToken(sendTokenToServer);

      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    action: null,
    isLogin: !!localStorage.getItem("TOKEN"),
    isLoading: false,
    error: null,
    accessToken: localStorage.getItem("TOKEN"),
    myInfo: {},
  },
  reducers: {
    logout(state, { type }) {
      state.isLoading = true;
      state.action = type;
    },
    logoutFinish(state, { type }) {
      state.myInfo = {};
      state.isLogin = false;
      state.accessToken = "";
      state.isLoading = false;
      state.action = type;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, { type, payload }) => {
      state.isLoading = true;
      state.action = type;
    });
    // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
    builder.addCase(login.fulfilled, (state, { type, payload }) => {
      state.action = type;
      state.accessToken = payload.token;
      state.isLoading = false;
      state.isLogin = true;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.action = action.type;
      if (action.payload) {
        state.isLoading = false;
        state.isLogin = false;
        state.error = action.payload;
      } else {
        state.error = action.error.message;
        state.isLogin = false;
      }
    });
  },
});

function* logoutSaga() {
  try {
    const registrationToken = yield call(getRegistrationToken);
    yield call(logoutRequest, registrationToken);
    yield call(deleteCurrentRegistrationToken);
    yield put(logoutFinish());
  } catch (err) {
    yield put(logoutFinish());
  }
}

const { logout, logoutFinish } = authSlice.actions;

export { login, logout, logoutFinish, logoutSaga };

export default authSlice.reducer;
