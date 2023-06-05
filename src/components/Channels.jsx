import List from './List';
import ReactModal from '../components/ReactModal';
import { useEffect, useRef, useState } from 'react';
import api from '../api.js';

export default function Channels(props) {
  const {
    loggedUser,
    setConversation,
    currentMessagedId,
    messageSuccess,
    receiverClass,
    setReceiverData,
    setReceiverClass,
    setCurrentMessagedId,
  } = props;
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);
  const [createChannelIsSuccess, setCreateChannelIsSuccess] = useState(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    const getData = async () => {
      const response = await api.get(`/channels`);
      setData(() => {
        return response.data.data ?? [];
      });
    };
    if (receiverClass === 'Channel') {
      channelClick(currentMessagedId);
      getData();
    }
    if (!mountedRef.current) {
      getData();
      mountedRef.current = true;
    }
  }, [createChannelIsSuccess, messageSuccess]);

  const channelClick = async (id) => {
    const res = await api.get(`/channels/${id}`);
    setReceiverData(res.data.data);
    setReceiverClass('Channel');
    setCurrentMessagedId(id);
    const response = await api.get(
      `/messages?receiver_id=${id}&receiver_class=Channel`
    );
    setConversation(response.data.data);
  };

  return (
    <div className="container-fluid nav-tabs px-2 pb-2">
      <ReactModal
        loggedUser={loggedUser}
        setCreateChannelIsSuccess={setCreateChannelIsSuccess}
        show={modalShow}
        onHide={() => setModalShow(false)}
        setReceiverData={setReceiverData}
        setCurrentMessagedId={setCurrentMessagedId}
        setConversation={setConversation}
        setReceiverClass={setReceiverClass}
      />
      {data && (
        <List
          handleClick={channelClick}
          setConversation={setConversation}
          title={'Channels'}
          data={data}
          callback={setModalShow}
        />
      )}
    </div>
  );
}
