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
    alert,
    setAlert
  } = props;

  // message = receiver_id, receiver_class, body
  const [message, setMessage] = useState('');
  const isLoadingRef = useRef(false)
  const firstMountRef = useRef(true);

  useEffect(() => {
    const updateReceiver = async () => {
      try {
        const response = await api.get('/users');
        const users = response.data.data;
        const userData = users.find((user) => user.id === currentMessagedId);
        setReceiverData({ id: userData.id, name: userData.email });
      } catch (error) {
        console.log(error)
        setAlert({status: "error", message: error})
      }
    };
    if (!firstMountRef) {
      if (receiverClass !== null) {
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
        body: message
      });
      if (response.statusText === 'OK') {
        setMessage('');
        if (receiverClass === 'User') {
          setContacts(() => {
            const localContacts = JSON.parse(localStorage.getItem('contacts'));

            let updatedContact = localContacts[loggedUser.id]

            if(!updatedContact[receiverData.id]) {
              updatedContact = { ...updatedContact, [receiverData.id] : receiverData.email }
            }
            localContacts[loggedUser.id] = updatedContact
            localStorage.setItem("contacts",JSON.stringify(localContacts))
            return localContacts
          })
        }
        await setCurrentMessagedId(receiverData.id)
        setMessageSuccess(true)
      } else {
        console.log(error)
        setAlert({status: "error", message: "Failed to send message."})
      }
    } catch (error) {
      console.log(error)
      setAlert({status: "error", message: error})
    }
  };

  const handleChatSubmit = (event) => {
    event.preventDefault();
    if(receiverData?.id === undefined) {
      setAlert({status: "error", message: "Invalid recipient!"})
      return
    }
    if(isLoadingRef.current.value === true) return
    sendMessage();
  };

  return (
    <div className="container-fluid h-100 mh-100 p-2 bg-white d-flex flex-column gap-2">
      {currentMessagedId ? null : (
        <DirectMessagesHeader
          isLoadingRef={isLoadingRef}
          setAlert={setAlert}
          client={client}
          setReceiverData={setReceiverData}
          receiverClass={receiverClass}
          setReceiverClass={setReceiverClass}
        />
      )}
      { currentMessagedId ? <></> :
          !alert.status ? <></> :
            alert.status === "error" ? 
              <div className="d-flex justify-content-center align-items-center gap-2 alert alert-danger p-2" role="alert" style={{fontWeight: "bold"}}>
                <i className="bi bi-x-circle-fill"></i>
                <div>
                  {alert.message}
                </div>
              </div>
              :
              alert.status === "success" ?
                <div className="d-flex justify-content-center align-items-center gap-2 alert alert-success d-flex align-items-center p-2" role="alert" style={{fontWeight: "bold"}}>
                  <i className="bi bi-check-circle-fill"></i>
                  <div>
                    {alert.message}
                  </div>
                </div>
                :
                <div className="d-flex justify-content-center align-items-center gap-2 alert alert-primary d-flex align-items-center p-2" role="alert" style={{fontWeight: "bold"}}>
                  <div class="spinner-border text-primary" role="status">
                  </div>
                  <div>
                    {alert.message}
                  </div>
                </div>  
      }
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
