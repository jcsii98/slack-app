import CredentialsPage from './CredentialsPage.jsx';
import Header from '../components/Header.jsx';
import { useEffect, useState } from 'react';
import DashPage from './DashPage.jsx';
import api from '../pages/api.js';

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
    setConfig(config)
  },[isLoggedIn])

  useEffect(() => {
    const accessToken = localStorage.getItem('access-token');
    const client = localStorage.getItem('client');
    const expiry = localStorage.getItem('expiry');
    const uid = localStorage.getItem('uid');

    if (accessToken && client && expiry && uid) {
      api.defaults.headers.common['access-token'] = accessToken;
      api.defaults.headers.common.client = client;
      api.defaults.headers.common.expiry = expiry;
      api.defaults.headers.common.uid = uid;

      api
        .get('http://206.189.91.54/api/v1/auth/validate_token')
        .then((response) => {
          setLoggedUser(response.data.data);
          setConfig({
            accessToken: accessToken,
            client: client,
            expiry: expiry,
            uid: uid
          })
          setIsLoggedIn(true);
        })
        .catch((error) => {
          console.error(error);
          setIsLoggedIn(false);
          setLoggedUser(null);
        });
    } else {
      setIsLoggedIn(false);
      setLoggedUser(null);
    }
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <div className='container-fluid d-flex flex-column h-100 p-0'>
          <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} loggedUser={loggedUser}/>
          <DashPage
            email={email}
            setEmail={setEmail}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            config={config}
            setConfig={setConfig}
            loggedUser={loggedUser}
          />
        </div>
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
