import Sidebar from '../components/Sidebar';
import DashboardCenter from '../components/DashboardCenter';
import { useState } from 'react';

function DashPage(props) {
  const { loggedUser } = props;
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts'))
  );
  const [messageSuccess, setMessageSuccess] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [currentMessagedId, setCurrentMessagedId] = useState(0);
  const [receiverData, setReceiverData] = useState({});
  const [receiverClass, setReceiverClass] = useState('');
  const [alert,setAlert] = useState({status: "", message: ""})

  return (
    <div className="container-fluid h-100 d-flex border-top p-0">
      <Sidebar
        loggedUser={loggedUser}
        contacts={contacts}
        setContacts={setContacts}
        messageSuccess={messageSuccess}
        setConversation={setConversation}
        currentMessagedId={currentMessagedId}
        setCurrentMessagedId={setCurrentMessagedId}
        receiverData={receiverData}
        setReceiverData={setReceiverData}
        receiverClass={receiverClass}
        setReceiverClass={setReceiverClass}
        setMessageSuccess={setMessageSuccess}
        setAlert={setAlert}
      />
      <DashboardCenter
        loggedUser={loggedUser}
        contacts={contacts}
        setContacts={setContacts}
        messageSuccess={messageSuccess}
        setMessageSuccess={setMessageSuccess}
        conversation={conversation}
        currentMessagedId={currentMessagedId}
        setCurrentMessagedId={setCurrentMessagedId}
        receiverData={receiverData}
        setReceiverData={setReceiverData}
        receiverClass={receiverClass}
        setReceiverClass={setReceiverClass}
        alert={alert}
        setAlert={setAlert}
      />
    </div>
  );
}

export default DashPage;
