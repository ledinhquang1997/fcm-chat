import React, {useEffect} from 'react';
import styles from '../../chat.module.css';
import ConversationItem from './ConversationItem';
import {useDispatch, useSelector} from 'react-redux';
import {currentTabSelector} from '../../selectors';
import {getConversationList, selectConversation} from '../../slices/conversationListSlice';

export default function ConversationList() {
  const {conversations} = useSelector((state) => state.conversationList);
  const currentTab = useSelector(currentTabSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConversationList());
  }, [currentTab]);

  return (
    <div className={styles['people-list']}>
      <div className={styles.search}>
        <input type="text" placeholder="search" />
      </div>
      <ul className={styles.list}>
        {conversations.map((item) => (
          <ConversationItem key={item} conversationId={item} />
        ))}
      </ul>
    </div>
  );
}
