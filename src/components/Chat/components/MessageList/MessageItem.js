import React, {useMemo} from 'react';
import styles from '../../chat.module.css';
import {makeMessageDataSelector} from '../../selectors';
import {useSelector} from 'react-redux';
import { myInfoSelector } from '../../../Auth/selector';

const formatDate = (dateString) => {
  const options = {year: 'numeric', month: 'long', day: 'numeric'};
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const getIcon = (status) => {
  switch (status) {
    case 'pending':
      return '🔜';
    case 'success':
      return '';
    case 'fail':
      return '❌';
    default:
      break;
  }
};

export default function MessageItem(props) {
  const {id} = props;
  const messageDataSelector = useMemo(makeMessageDataSelector, []);
  const {dc, text, sender_id, sender_first_name, sender_last_name, status} =
    useSelector((state) => messageDataSelector(state, id));
  const {member_id: myId} = useSelector(myInfoSelector);
  const isMine = sender_id === myId;

  return (
    <li className={isMine && styles.clearfix}>
      <div
        className={`${styles['message-data']} ${
          isMine && styles['align-right']
        }`}
      >
        <span className={styles['message-data-time']}>{formatDate(dc)}</span>{' '}
        &nbsp; &nbsp;
        <span className={styles['message-data-name']}>
          {sender_first_name + ' ' + sender_last_name}{' '}
          {isMine && getIcon(status)}
        </span>{' '}
      </div>
      <div
        className={`${styles['message']} ${
          styles[isMine ? 'other-message' : 'my-message']
        } ${isMine && styles['float-right']}`}
      >
        {text}
      </div>
    </li>
  );
}
