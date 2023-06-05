import { useState, useEffect } from 'react';
import List from './List';
import api from '../api.js';

export default function DirectMessages(props) {
  const {
    loggedUser,
    contacts,
    messageSuccess,
    setConversation,
    currentMessagedId,
    setCurrentMessagedId,
    setReceiverData,
    receiverClass,
    setReceiverClass,
  } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = () => {
      setData(() => {
        const localUserContact = contacts.find((data) => {
          return data.userId === loggedUser.id;
        });
        return localUserContact.contacts;
      });
    };
    getData();
    if (currentMessagedId && receiverClass !== 'Channel')
      userClick(currentMessagedId);
  }, [messageSuccess]);

  const userClick = async (id) => {
    setCurrentMessagedId(id);
    const response = await api.get(
      `/messages?receiver_id=${id}&receiver_class=User`
    );
    setReceiverClass('User');
    const userReceiver = response.data.data[0].receiver;
    setReceiverData({ id: userReceiver.id, name: userReceiver.email });
    setConversation(Array.from(response.data.data));
  };

  return (
    <div className="container-fluid p-0 nav-tabs">
      {data && (
        <List
          handleClick={userClick}
          setConversation={setConversation}
          title={'Direct Messages'}
          classType={'d-none'}
          data={data}
        />
      )}
    </div>
  );
}
