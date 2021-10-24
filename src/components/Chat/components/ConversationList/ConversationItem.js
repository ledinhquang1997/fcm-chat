import React from 'react';
import styles from '../../chat.module.css';
import {useSelector, useDispatch} from 'react-redux';
import {selectConversation} from '../../slices/conversationListSlice';
import {getConversationMessages} from '../../slices/chatSlice';
import useConversationData from '../../hooks/useConversationData';
import {currentConversationIdSelector} from '../../selectors';

export default function ConversationItem(props) {
  const dispatch = useDispatch();

  const {
    receiver_first_name,
    receiver_last_name,
    conversation_id,
    seller_id,
    buyer_id,
  } = useConversationData(props.conversationId);

  const currentConversation = useSelector(currentConversationIdSelector);

  const onConversationClickHandler = () => {
    dispatch(selectConversation({conversation_id}));
    dispatch(
      getConversationMessages({
        conversation_id,
        seller_id,
        buyer_id,
      })
    );
  };

  return (
    <div>
      <li
        className={`${styles.clearfix} ${styles.conversation} ${
          currentConversation === conversation_id && styles.active
        }`}
        onClick={onConversationClickHandler}
      >
        <div className={styles.about}>
          <div className={styles.name}>
            {receiver_first_name + ' ' + receiver_last_name}
          </div>
          <div className={styles.status}>online</div>
        </div>
      </li>
    </div>
  );
}
