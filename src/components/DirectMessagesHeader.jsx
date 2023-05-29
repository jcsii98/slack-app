import { useState } from 'react';

function DirectMessagesHeader(props) {
  const { client,setReceiverData } = props;
  const [inputValue, setInputValue] = useState('');
  const [userExists, setUserExists] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const checkUserExists = async () => {
    try {
      const response = await client.get("/users")
      console.log(response)
      const users = response.data.data;
      const exists = users.some((user) => user.uid === inputValue);

      setUserExists(exists);

      if (exists) {
        const userData = users.find((user) => user.uid === inputValue);
        console.log('User data:', userData);
        setReceiverData(userData)
      } else {
        console.log('User does not exist');
        setReceiverData()
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