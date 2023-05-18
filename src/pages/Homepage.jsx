import Credentials from '../components/Credentials.jsx';
import Header from '../components/Header.jsx';
import { useEffect, useState } from 'react';
import DashPage from './DashPage.jsx';
function Homepage(props) {
  const { isLoggedIn, setIsLoggedIn } = props;
  const [email, setEmail] = useState('');
  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);
  return (
    <>
      <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      {isLoggedIn ? (
        <DashPage
          email={email}
          setEmail={setEmail}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      ) : (
        <Credentials
          email={email}
          setEmail={setEmail}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
    </>
  );
}

export default Homepage;
