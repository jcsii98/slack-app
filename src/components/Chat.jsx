import DirectMessagesHeader from './DirectMessagesHeader';
import Message from './Message';
import { useEffect, useRef, useState } from 'react';
import api from '../api.js';

function Chat(props) {
  const {
    conversation,
    client,
    loggedUser,
    setContacts,
    setMessageSuccess,
    currentMessagedId,
    setCurrentMessagedId,
    receiverData,
    setReceiverData,
    receiverClass,
    setReceiverClass,
  } = props;

  // message = receiver_id, receiver_class, body
  const [message, setMessage] = useState('');

  const firstMountRef = useRef(true);

  useEffect(() => {
    const updateReceiver = async () => {
      try {
        const response = await api.get('/users');
        const users = response.data.data;
        const userData = users.find((user) => user.id === currentMessagedId);
        setReceiverData({ id: userData.id, name: userData.email });
      } catch (error) {
        console.log(error);
      }
    };
    if (!firstMountRef) {
      if (receiverClass !== 'Channel') {
        updateReceiver();
      }
    }
    firstMountRef.current = true;
  }, [currentMessagedId]);

  const sendMessage = async () => {
    setMessageSuccess(false);
    try {
      const response = await api.post('/messages', {
        receiver_id: receiverData.id,
        receiver_class: receiverClass,
        body: message,
      });
      if (response.statusText === 'OK') {
        setMessage('');
        if (receiverClass === 'User') {
          setContacts(() => {
            const localContacts = JSON.parse(localStorage.getItem('contacts'));

            const updatedLocalContacts = localContacts.map((contactData) => {
              if (contactData.userId === loggedUser.id) {
                const bool = contactData.contacts.find((data) => {
                  return data.id === receiverData.id;
                });
                if (!bool) {
                  contactData.contacts = [
                    ...contactData.contacts,
                    { id: receiverData.id, name: receiverData.email },
                  ];
                }
              }
              return contactData;
            });
            localStorage.setItem(
              'contacts',
              JSON.stringify(updatedLocalContacts)
            );
            return updatedLocalContacts;
          });
        }
        await setCurrentMessagedId(receiverData.id);
        setMessageSuccess(true);
      } else {
        console.error('Failed to send message');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChatSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  return (
    <div className="container-fluid h-100 mh-100 p-2 bg-white d-flex flex-column gap-2">
      {currentMessagedId ? null : (
        <DirectMessagesHeader
          client={client}
          setReceiverData={setReceiverData}
          receiverClass={receiverClass}
          setReceiverClass={setReceiverClass}
        />
      )}
      <Message conversation={conversation} loggedUser={loggedUser} />
      <div
        className="container-fluid rounded-4 border border-dark d-flex flex-column px-3 py-2"
        style={{ height: '18%', marginTop: 'auto' }}
      >
        <div
          className="d-flex border-bottom gap-3 pb-1"
          style={{ fontSize: '1.2rem' }}
        >
          <i className="bi bi-type-bold"></i>
          <i className="bi bi-type-italic"></i>
          <i className="bi bi-type-strikethrough"></i>|
          <i className="bi bi-link-45deg"></i>|<i className="bi bi-list-ol"></i>
          <i className="bi bi-list-ul"></i>|
          <i className="bi bi-blockquote-left"></i>|
          <i className="bi bi-code-slash"></i>
          <i className="bi bi-file-earmark-code"></i>
        </div>
        <form
          onSubmit={handleChatSubmit}
          className="flex-grow-1 d-flex align-items-start"
        >
          <input
            className="container-fluid h-100"
            style={{ outline: 'none', border: 'none' }}
            placeholder="Type a message..."
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </form>
        <div className="d-flex justify-content-end px-3">
          <i
            className="bi bi-send-fill"
            style={{ rotate: '45deg' }}
            onClick={handleChatSubmit}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default Chat;
