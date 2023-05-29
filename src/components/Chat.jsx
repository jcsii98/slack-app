import DirectMessagesHeader from './DirectMessagesHeader';
import Message from './Message';
import { useState } from 'react';

function Chat(props) {
  const { client,loggedUser,setContacts,setMessageSuccess } = props

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
        setMessage('');
        setContacts(() => {
          const localContacts = JSON.parse(localStorage.getItem("contacts"))
          
          const updatedLocalContacts = localContacts.map( contactData => {
            if(contactData.userId === loggedUser.id) {
              console.log("here!")
              console.log(contactData.contacts)
              const bool = contactData.contacts.find( data => {
                return data.id === receiverData.id
              })
              if(!bool) {
                contactData.contacts = [ ...contactData.contacts, { id: receiverData.id, name: receiverData.email } ]
              }
            }
            return contactData
          })
          localStorage.setItem("contacts",JSON.stringify(updatedLocalContacts))
          return updatedLocalContacts
        })
        setMessageSuccess(true)
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
        <Message />
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