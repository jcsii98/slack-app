import { useRef, useState } from 'react';
import api from '../api.js';
function DirectMessagesHeader(props) {
  const { setReceiverData, setAlert, setReceiverClass, isLoadingRef } = props;
  const [inputValue, setInputValue] = useState('');
  const [userExists,setUserExists] = useState(false);
  const headerInputRef = useRef()
  const formRef = useRef()
  const wasRunOnceRef = useRef(false)

  const checkUserExists = async () => {
    try {
      const response = await api.get('/users');

      const users = response.data.data;
      const userData = users.find((user) => user.uid === inputValue);

      if (userData) {
        setReceiverData(userData);
        setReceiverClass('User');
        setUserExists(true);
        setAlert({status: "success", message: `User exists!`})
        console.log("success!")
      } else {
        setAlert({status: "error", message: `User does not exist`})
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
          setAlert({status: "success", message: `Channel with name '${value}' exists`})
          const channelData = channels.find(
            (channel) => channel.name === value
          );
          setReceiverData(channelData);
          setReceiverClass('Channel');
        } else {
          setAlert({status: "error", message: `Channel with name '${value}' does not exist`})
        }
      } else {
        throw new Error('Failed to get channels');
      }
    } catch (error) {
      console.log(error)
      console.error('Failed to get channels:', error);
      setAlert({status: "error", message: "Failed to get channels!"})
    }
  };

  const handleFocus = () => {
    if (inputValue.trim() !== '') {
    }
  };

  const handleBlur = () => {
    if(wasRunOnceRef.current || !headerInputRef.current.value) return 0
    console.log("processing")
    wasRunOnceRef.current = true
    setInputValue(headerInputRef.current.value)
    setAlert({status: "", message: ""})
    formRef.current.requestSubmit()
  };

  const handleChange = (event) => {
    wasRunOnceRef.current = false
    setAlert({status: "", message: ""})
    const value = event.target.value;
    setInputValue(value);
  };

  const handleCheckSubmit = (event) => {
    event.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const value = inputValue;
    console.log("value: " + value)
    if(value) {
      isLoadingRef.current = true
      setAlert({status: "loading", message: "Checking if recipient exists..."})
      if (emailPattern.test(value)) {
        checkUserExists(value);
      } else {
        checkChannelExists(value);
      }
    } else {
      setAlert({status: "error", message: "No Input!"})
    }
    isLoadingRef.current = false
  };
  return (
    <div className="dm-header">
      <form onSubmit={handleCheckSubmit} className="dm-form" ref={formRef}>
        <div className="input-field">
          <span className="prefix">To: </span>
          <input
            style={{height: "3.5rem"}}
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
    </div>
  );
}

export default DirectMessagesHeader;
