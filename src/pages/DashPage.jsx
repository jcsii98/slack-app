import Sidebar from '../components/Sidebar';
import DashboardCenter from '../components/DashboardCenter';
import axios from 'axios';
import { useEffect, useState } from 'react';

function DashPage(props) {
  const { config,loggedUser } = props
  const [ contacts,setContacts ] = useState(JSON.parse(localStorage.getItem("contacts")))
  const [ messageSuccess, setMessageSuccess ] = useState(false)
  const [ conversation,setConversation ] = useState([])
  const [ currentMessagedId,setCurrentMessagedId ] = useState(0)
  const [ receiverData,setReceiverData ] = useState({})
  const [ receiverClass, setReceiverClass ] = useState('')

  useEffect(() => {
    console.log("receiver data: ")
    console.log(receiverData)
    console.log("receiver Class: ")
    console.log(receiverClass)
    console.log("current Messaged Id: ")
    console.log(currentMessagedId)
    console.log("conversation: ")
    console.log(conversation)
    console.log("messageSuccess: ")
    console.log(messageSuccess)
  },[messageSuccess,conversation,currentMessagedId,receiverClass,receiverData])


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
      <div className="container-fluid h-100 d-flex border-top p-0">
        <Sidebar 
          client={client}
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
        />
        <DashboardCenter 
          client={client}
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
        />
      </div>
  );
}

export default DashPage;
