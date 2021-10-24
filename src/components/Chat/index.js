import React, {useEffect} from 'react';
import styles from './chat.module.css';
import UserList from './components/ConversationList';
import {useSelector, useDispatch} from 'react-redux';
import {updateAccessToken} from '../../utils/request';
import {getMyInfo} from '../Auth/slices/myInfoSlice';
import {useHistory} from 'react-router';
import {getMessaging, onMessage} from 'firebase/messaging';
import ChatBox from './components/ChatBox';
import {appendMessage} from './slices/chatSlice';
import {currentTabSelector} from './selectors';
import {selectConversation, selectTab} from './slices/conversationListSlice';
import { deleteCurrentRegistrationToken } from '../../services/fcmService';

export default function Chat() {
  const {isLogin, accessToken} = useSelector((state) => state.auth);
  const currentTab = useSelector(currentTabSelector);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogin) {
      updateAccessToken(accessToken);
      dispatch(getMyInfo());
    } else {
      history.push('/auth');
    }
  }, [accessToken, dispatch, history, isLogin]);

  const onReceiveMessage = (messageData) => {
    dispatch(appendMessage(messageData));
  };

  useEffect(() => {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      onReceiveMessage({messageData: payload.data});
    });
  }, []);


  // TODO: Move it to App component
  useEffect(() => {
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data.action === 'receiveMessage' && event.data.data) {
        onReceiveMessage({messageData: event.data.data});
      }
    });
  }, []);

  const selectTabHandler = (tab) => {
    dispatch(selectTab({tab}));
    dispatch(selectConversation({conversation_id: null}))
  };

  const deleteToken = () => {
    deleteCurrentRegistrationToken();
  }

  return (
    <div className={`${styles.container} ${styles.clearfix}`}>
      <button onClick={deleteToken}>DeleteToken Token</button>
      <div>
        <span
          onClick={() => selectTabHandler('selling')}
          className={`${styles.tab} ${
            currentTab === 'selling' && styles['tab-active']
          }`}
        >
          SELLING
        </span>
        <span
          onClick={() => selectTabHandler('buying')}
          className={`${styles.tab} ${
            currentTab === 'buying' && styles['tab-active']
          }`}
        >
          BUYING
        </span>
      </div>
      <UserList />
      <ChatBox />
    </div>
  );
}
