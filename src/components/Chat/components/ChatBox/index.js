import React from 'react';
import ChatHeader from '../../ChatHeader';
import ChatInput from '../ChatInput';
import MessageList from '../MessageList';
import {useSelector} from 'react-redux';
import styles from '../../chat.module.css';

export default function ChatBox() {
  const currentConversation = useSelector(
    (state) => state.conversationList.currentConversation
  );
  return (
    <div className={styles.chat}>
      {currentConversation && (
        <>
          <ChatHeader />
          <MessageList />
          <ChatInput />
        </>
      )}
    </div>
  );
}
