import List from './List';
import ReactModal from '../components/ReactModal';
import { useEffect, useState } from 'react';
import api from '../api.js';

export default function Channels(props) {
  const {
    client,
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

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await api.get('/channels');
        setData(response.data.data ?? []);
      } catch (error) {
        console.error(error);
        // Handle error state or display a proper error message
      }
    };

    if (receiverClass === 'Channel') {
      handleClick(currentMessagedId);
    }

    getData();
  }, [createChannelIsSuccess, messageSuccess]);

  const handleClick = async (id) => {
    try {
      const res = await api.get(`/channels/${id}`);
      setReceiverData(res.data.data);
      setReceiverClass('Channel');
      console.log(res.data.data);
      setCurrentMessagedId(id);
      console.log('receiver id: ' + id);
      console.log('receiver class: ' + receiverClass);
      const response = await api.get(
        `/messages?receiver_id=${id}&receiver_class=Channel`
      );
      console.log(response);
      setConversation(response.data.data);
    } catch (error) {
      console.error(error);
      // Handle error state or display a proper error message
    }
  };

  return (
    <div className="container-fluid nav-tabs px-2 pb-2">
      <ReactModal
        client={client}
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
          handleClick={handleClick}
          setConversation={setConversation}
          client={client}
          title={'Channels'}
          data={data}
          callback={setModalShow}
        />
      )}
    </div>
  );
}
