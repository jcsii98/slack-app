import CredentialsPage from './CredentialsPage.jsx';
import Header from '../components/Header.jsx';
import { useEffect, useState } from 'react';
import DashPage from './DashPage.jsx';
function Homepage(props) {
  const { isLoggedIn, setIsLoggedIn } = props;
  const [email, setEmail] = useState('');

  const [ loggedUser, setLoggedUser ] = useState({});
  const [ config,setConfig ] = useState({ 
   accessToken: "",
   client:"",
   expiry:"",
   uid:""
  })

  useEffect(() => {
    console.log("isLoggedIn[Homepage]: " + isLoggedIn);
    console.log(config)
  }, [isLoggedIn]);
  return (
    <>
      {isLoggedIn ? (
        <>
          <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <DashPage
            email={email}
            setEmail={setEmail}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            config={config}
            setConfig={setConfig}
            loggedUser={loggedUser}
          />
        </>
      ) : (
        <CredentialsPage
          email={email}
          setEmail={setEmail}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          config={config}
          setConfig={setConfig}
          loggedUser={loggedUser}
          setLoggedUser={setLoggedUser}
        />
      )}
    </>
  );
}

export default Homepage;
