import { useState, useEffect } from 'react';
import axios from 'axios';

function DirectMessagesHeader(props) {
  const { userReceiver, setUserReceiver } = props;
  const [inputValue, setInputValue] = useState('');
  const [userExists, setUserExists] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const checkUserExists = async () => {
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
      const exists = users.some((user) => user.uid === inputValue);

      setUserExists(exists);

      if (exists) {
        const userData = users.find((user) => user.uid === inputValue);
        const userId = userData.id; // Access the "id" field from userData
        console.log('User data:', userData);
        setUserReceiver(userId); // Set the userReceiver state to the userId
        console.log(userReceiver);
      } else {
        console.log('User does not exist');
        setUserReceiver();
      }
    } catch (error) {
      console.error('Failed to retrieve user:', error);
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
    const value = event.target.value;
    checkUserExists(value);
  };
  useEffect(() => {
    console.log('userReceiver:', userReceiver);
  }, [userReceiver]);
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
            {userExists ? <p>User exists!</p> : <div>...</div>}
          </div>
        )}
      </div>
    </>
  );
}

export default DirectMessagesHeader;