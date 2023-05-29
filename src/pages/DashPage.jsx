import Sidebar from '../components/Sidebar';
import DashboardCenter from '../components/DashboardCenter';
import axios from 'axios';
import { useState } from 'react';

function DashPage(props) {
  const { isLoggedIn, setIsLoggedIn, email, setEmail } = props;
  const { config,loggedUser } = props
  const [ contacts,setContacts ] = useState(JSON.parse(localStorage.getItem("contacts")))
  const [ messageSuccess, setMessageSuccess ] = useState(false)

  const client = axios.create({
    baseURL: "http://206.189.91.54/api/v1",
    headers: {
      "access-token": config.accessToken,
      "client": config.client,
      "expiry": config.expiry,
      "uid": config.uid
    }
  });
  
  return (
    <>
      <div className="dashboard-center-container">
        <Sidebar 
          client={client}
          loggedUser={loggedUser}
          contacts={contacts}
          setContacts={setContacts}
          messageSuccess={messageSuccess}
        />
        <DashboardCenter 
          client={client}
          loggedUser={loggedUser}
          contacts={contacts}
          setContacts={setContacts}
          messageSuccess={messageSuccess}
          setMessageSuccess={setMessageSuccess}
        />
      </div>
    </>
  );
}

export default DashPage;
