import { useState, useEffect } from 'react';
import axios from 'axios';

function DirectMessagesHeader(props) {
  const { userReceiver, setUserReceiver, receiverClass, setReceiverClass } =
    props;
  const [inputValue, setInputValue] = useState('');
  const [receiverExists, setReceiverExists] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const checkUserExists = async (value) => {
    try {
      const response = await axios.get('http://206.189.91.54/api/v1/users', {
        headers: {
          'access-token': sessionStorage.getItem('access-token'),
          client: sessionStorage.getItem('client'),
          expiry: sessionStorage.getItem('expiry'),
          uid: sessionStorage.getItem('uid'),
        },
      });

      const users = response.data.data;
      const exists = users.some((user) => user.uid === value);

      if (exists) {
        const userData = users.find((user) => user.uid === value);
        const userId = userData.id; // Access the "id" field from userData
        console.log('User data:', userData);
        setUserReceiver(userId); // Set the userReceiver state to the userId
        setReceiverClass('User');
        setReceiverExists('exists');
      } else {
        console.log('User does not exist');
        setUserReceiver();
      }
    } catch (error) {
      console.error('Failed to retrieve user:', error);
    }
  };

  const checkChannelExists = async (value) => {
    try {
      const response = await axios.get(
        `http://206.189.91.54/api/v1/channels/${value}`,
        {
          headers: {
            'access-token': sessionStorage.getItem('access-token'),
            client: sessionStorage.getItem('client'),
            expiry: sessionStorage.getItem('expiry'),
            uid: sessionStorage.getItem('uid'),
          },
        }
      );

      if (response.status === 200) {
        const channelDetails = response.data;
        console.log('Channel details:', channelDetails);
        setUserReceiver(value);
        setReceiverClass('Channel');
        setReceiverExists('exists');
        // Handle channel details
      } else {
        throw new Error('Failed to get channel details');
      }
    } catch (error) {
      console.error('Failed to get channel details:', error);
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
      // Reset channel-related states
      setReceiverExists(false);
      setUserReceiver(null);
      // Check user existence
      checkUserExists(value);
    } else {
      setUserReceiver(null);
      // Check channel existence
      checkChannelExists(value);
    }
  };

  useEffect(() => {
    console.log('userReceiver:', userReceiver);
    console.log('receiverClass:', receiverClass);
  }, [userReceiver, receiverClass]);

  return (
    <>
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
            {receiverExists ? <p>Receiver exists!</p> : <div>...</div>}
          </div>
        )}
      </div>
    </>
  );
}

export default DirectMessagesHeader;
