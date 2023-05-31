import DirectMessagesHeader from './DirectMessagesHeader.jsx';
import Channels from './Channels.jsx';
import { useState, useEffect } from 'react';
function Chat() {
  const [receiverClass, setReceiverClass] = useState('');
  // message = receiver_id, receiver_class, body
  const [userReceiver, setUserReceiver] = useState('');
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    const url = 'http://206.189.91.54/api/v1/messages';
    const receiverId = userReceiver;
    const receiverClass2 = receiverClass;
    console.log('receiverId:', receiverId);
    console.log('receiverClass:', receiverClass2);

    const headers = {
      'Content-Type': 'application/json',
      'access-token': sessionStorage.getItem('access-token'),
      client: sessionStorage.getItem('client'),
      expiry: sessionStorage.getItem('expiry'),
      uid: sessionStorage.getItem('uid'),
    };

    const requestBody = {
      receiver_id: receiverId,
      receiver_class: receiverClass2,
      body: message,
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Message sent!');

        setMessage('');
        console.log('Response:', data);
      } else {
        console.error('Failed to send message');
        console.log('Error:', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChatSubmit = (event) => {
    event.preventDefault();
    const value = event.target.value;
    sendMessage(value);
  };

  return (
    <>
      <div className="chat-main-container">
        <DirectMessagesHeader
          userReceiver={userReceiver}
          setUserReceiver={setUserReceiver}
          receiverClass={receiverClass}
          setReceiverClass={setReceiverClass}
        />
        <div className="messages-container"></div>
        <div className="chat-footer">
          <div className="chat-input-container">
            <div className="chat-input-header">chat symbols here</div>
            <div className="chat-input-form-container">
              <form onSubmit={handleChatSubmit} className="chat-input-form">
                <input
                  placeholder="Type a message..."
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </form>
            </div>
            <div className="chat-input-footer">
              <button type="button"></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
