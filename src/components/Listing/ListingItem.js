import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router';
import { myInfoSelector } from '../Auth/selector';
import API from '../Chat/api';
import { getConversationMessages } from '../Chat/slices/chatSlice';
import {selectConversation, selectTab} from '../Chat/slices/conversationListSlice';

export default function ListingItem({listingItem}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const {member_id, title, name} = listingItem;
  const textareaRef = useRef(null);
  const [isOn, setIsOn] = useState(false);
  const toggle = () => {
    setIsOn((prevState) => !prevState);
  };
  const {member_id: myId} = useSelector(myInfoSelector);

  const sendHandler = async () => {
    const data = {
      buyer_id: myId,
      seller_id: member_id,
      text: textareaRef.current.value,
    };

    try {
      const message = await API.sendMessage(data);
      const {conversation_id} = message;
      dispatch(selectTab({tab: "buying"}))
      dispatch(selectConversation({conversation_id}));
      setTimeout(()=>{
        dispatch(getConversationMessages({conversation_id}))
        history.push('/chat')

      }, 500)
    } catch (err) {
      console.log(err)
    }
    
  };

  return (
    <li>
      <span onClick={toggle}>
        {title} - {name}
      </span>
      {isOn && (
        <div>
          <textarea ref={textareaRef}></textarea>
          <span>
            <button onClick={sendHandler}>Send</button>
          </span>
        </div>
      )}
    </li>
  );
}
