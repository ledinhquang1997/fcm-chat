import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {makeConversationDataSelector} from '../selectors';

export default function useConversationData(conversationId) {
  const conversationSelector = useMemo(makeConversationDataSelector, []);

  const conversationData = useSelector((state) =>
    conversationSelector(state, conversationId)
  );

  return conversationData;
}
