import { useState } from 'react';

function DirectMessagesHeader(props) {
  const { client,setReceiverData,receiverClass, setReceiverClass } = props;
  const [ inputValue,setInputValue ] = useState('');
  const [ showModal,setShowModal ] = useState(false);
  const [ userExists,setUserExits ] = useState(false)

  const checkUserExists = async () => {
    try {
      const response = await client.get("/users")

      const users = response.data.data;
      const exists = users.some((user) => user.uid === inputValue);

      if (exists) {
        const userData = users.find((user) => user.uid === inputValue);
        setReceiverData(userData)
        setReceiverClass('User')
      } else {
        console.log('User does not exist');
        setReceiverData()
      }
    } catch (error) {
      console.error('Failed to retrieve user:', error);
    }
  };

  const checkChannelExists = async (value) => {
    try {
      const response = await client.get("/channels")

      if (response.status === 200) {
        const channels = response.data.data; // Access the "data" field of the response

        const channelExists = channels.some(
          (channel) => channel.name === value
        );

        if (channelExists) {
          console.log(`Channel with name '${value}' exists`);
          const channelData = channels.find(
            (channel) => channel.name === value
          );
          setReceiverData(channelData);
          setReceiverClass('Channel');
        } else {
          console.log(`Channel with name '${value}' does not exist`);
        }
      } else {
        throw new Error('Failed to get channels');
      }
    } catch (error) {
      console.error('Failed to get channels:', error);
      // Handle error
    }
  };


  const handleFocus = () => {
    if (inputValue.trim() !== '') {
      setShowModal(true);
    }
  };

  const handleBlur = () => {
    setShowModal(false);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (value !== '') {
      setShowModal(true);
    }
  };

  const handleCheckSubmit = (event) => {
    event.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const value = inputValue;

    if (emailPattern.test(value)) {
      checkUserExists(value);
    } else {
      checkChannelExists(value);
    }
  };
  return (
    <div className="dm-header">
      <form onSubmit={handleCheckSubmit} className="dm-form">
        <div className="input-field">
          <span className="prefix">To: </span>
          <input
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="dmstyles"
            type="text"
            placeholder="@somebody or somebody@example.com"
            value={inputValue}
          />
        </div>
      </form>
      {showModal && (
        <div className="to-modal">
          {userExists ? <p>User exists!</p> : <div>...</div>}
        </div>
      )}
    </div>
  );
}

export default DirectMessagesHeader;