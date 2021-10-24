import React, {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import styles from '../../chat.module.css';
import {
  currentConversationIdSelector,
} from '../../selectors';
import {v4} from 'uuid';
import {sendMessage} from '../../slices/chatSlice';
import {myInfoSelector} from '../../../Auth/selector';
import useConversationData from '../../hooks/useConversationData';

export default function ChatInput() {
  const dispatch = useDispatch();
  const inputRef = useRef();

  const {member_id: myId, first_name, last_name} = useSelector(myInfoSelector);
  const currentConversationId = useSelector(currentConversationIdSelector);
  const {conversation_id, receiver_id, buyer_id, seller_id} =
    useConversationData(currentConversationId);

  const sendHandler = () => {
    const text = inputRef.current.value;

    const messageData = {
      sender_id: myId,
      buyer_id,
      seller_id,
      receiver_id,
      text,
      sender_first_name: first_name,
      sender_last_name: last_name,
      dc: new Date().toUTCString(),
      message_id: v4(),
      conversation_id,
      status: 'pending',
    };
    dispatch(
      sendMessage({
        messageData,
      })
    );

    inputRef.current.value = '';
  };

  const keyDownHandler = (event) => {
    if (event.key === 'Enter') {
      sendHandler();
    }
  };

  return (
    <div className={`${styles['chat-message']} ${styles['clearfix']}`}>
      <textarea
        onKeyDown={keyDownHandler}
        ref={inputRef}
        name="message-to-send"
        id="message-to-send"
        placeholder="Type your message"
        rows="3"
      ></textarea>
      <button onClick={sendHandler}>Send</button>
    </div>
  );
}
