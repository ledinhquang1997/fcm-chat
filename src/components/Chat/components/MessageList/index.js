import React, {useLayoutEffect} from 'react';
import styles from '../../chat.module.css';
import MessageItem from './MessageItem';
import {useSelector} from 'react-redux';
import {messageListSelector} from '../../selectors';

export default function MessageList() {
  const messagesList = useSelector(messageListSelector);

  useLayoutEffect(() => {
    const listEl = document.querySelector('#message-list');
    if(listEl){
      const scrollHeight = listEl.scrollHeight;
      listEl.scrollTo(0, scrollHeight)
    }
  }, [messagesList]);

  return (
    <div id="message-list" className={styles['chat-history']}>
      <ul className={styles.list}>
        {messagesList.map((item) => (
          <MessageItem key={item} id={item} />
        ))}
      </ul>
    </div>
  );
}
