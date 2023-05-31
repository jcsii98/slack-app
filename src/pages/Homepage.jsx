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

  // const [ config,setConfig ] = useState({ 
  //   accessToken: localStorage.getItem("access-token") ?? "",
  //   client: localStorage.getItem("client") ?? "",
  //   expiry: localStorage.getItem("expiry") ?? "",
  //   uid: localStorage.getItem("uid") ?? ""
  // })

  useEffect(() => {
    console.log("logged user data: ")
    console.log(loggedUser)
  },[loggedUser])

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
