import React from 'react';
import styles from './chat.module.css';
import {useSelector} from 'react-redux';
import {
  currentConversationIdSelector,
} from './selectors';
import useConversationData from './hooks/useConversationData';

export default function ChatHeader() {
  const currentConversationId = useSelector(currentConversationIdSelector);
  const {receiver_last_name, receiver_first_name} = useConversationData(currentConversationId);

  const name = receiver_first_name + ' ' + receiver_last_name;

  return (
    <div className={`${styles['chat-header']} ${styles.clearfix}`}>
      <div className={styles['chat-about']}>
        <div className={styles['chat-with']}>Chat with {name}</div>
        <div className={styles['chat-num-messages']}>
          already 1 902 messages
        </div>
      </div>
      <i className={`${styles.fa} ${styles['fa-star']}`}></i>
    </div>
  );
}
