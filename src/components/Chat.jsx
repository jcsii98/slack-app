import DirectMessagesHeader from './DirectMessagesHeader';
import { useState } from 'react';

function Chat(props) {
  const { client,loggedUser,contacts,setContacts } = props

  // message = receiver_id, receiver_class, body
  const [ message, setMessage ] = useState('');
  const [ receiverData,setReceiverData ] = useState({})

  const sendMessage = async () => {
    try {
      const response = await client.post("/messages", {
        receiver_id: receiverData.id,
        receiver_class: "User",
        body: message
      })
      console.log(response)
      if (response.statusText === "OK") {
        console.log(loggedUser)
        console.log(receiverData)
        console.log('Message sent!');
        setMessage('');
        setContacts(() => {
          const localContacts = JSON.parse(localStorage.getItem("contacts"))
          const userContacts = localContacts.find( data => {
            return data.userId === loggedUser.id
          })
          console.log(userContacts)
          if(userContacts) {
            console.log("found!")
          } else {
            console.log("not found!")
            // return [ { userId: user.id, userContacts: [ { contactId: receiver.id, contactName: receiver.email } ] } ]
          }
        })
        console.log('Response:', response.data);
      } else {
        console.error('Failed to send message');
        console.log('Error:', response.data);
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
          client={client}
          setReceiverData={setReceiverData}
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