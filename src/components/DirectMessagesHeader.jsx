import { useRef, useState } from 'react';
import api from '../api.js';
function DirectMessagesHeader(props) {
  const { setReceiverData, setAlert, setReceiverClass } = props;
  const [inputValue, setInputValue] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const headerInputRef = useRef()
  const formRef = useRef()

  const checkUserExists = async () => {
    try {
      const response = await api.get('/users');

      const users = response.data.data;
      const exists = users.some((user) => user.uid === inputValue);

      if (exists) {
        const userData = users.find((user) => user.uid === inputValue);
        setReceiverData(userData);
        setReceiverClass('User');
        setUserExists(true);
        console.log("success!")
      } else {
        console.log('User does not exist');
        setReceiverData();
        setReceiverClass('');
        setUserExists(false);
      }
    } catch (error) {
      console.error('Failed to retrieve user:', error);
    }
  };

  const checkChannelExists = async (value) => {
    try {
      const response = await api.get('/channels');

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
    console.log(headerInputRef.current.value)
    setInputValue(headerInputRef.current.value)
    setAlert({status: "", message: ""})
    formRef.current.requestSubmit()
  };

  const handleChange = (event) => {
    setAlert({status: "", message: ""})
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
    console.log("value: " + value)
    if(value) {
      if (emailPattern.test(value)) {
        checkUserExists(value);
      } else {
        checkChannelExists(value);
      }
    } else {
      console.log("no input!")
    }
  };
  return (
    <div className="dm-header">
      <form onSubmit={handleCheckSubmit} className="dm-form" ref={formRef}>
        <div className="input-field">
          <span className="prefix">To: </span>
          <input
            ref={headerInputRef}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="dmstyles"
            type="text"
            placeholder="@somebody or somebody@example.com"
            value={inputValue}
            required
          />
        </div>
      </form>
      {showModal && (
        <div className="to-modal container-fluid" style={{width: "90%"}}>
          {userExists ? 
            <p>User exists!</p>
            :
            <div>...</div>
          }
        </div>
      )}
    </div>
  );
}

export default DirectMessagesHeader;
