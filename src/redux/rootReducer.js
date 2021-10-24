import authReducer from '../components/Auth/slices/authSlice';
import myInfoReducer from '../components/Auth/slices/myInfoSlice';
import chatReducer from '../components/Chat/slices/chatSlice';
import conversationListReducer from '../components/Chat/slices/conversationListSlice';

const rootReducer = {
  auth: authReducer,
  myInfo: myInfoReducer,
  chat: chatReducer,
  conversationList: conversationListReducer,
};

export default rootReducer;
