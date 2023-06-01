import ChatHeader from './ChatHeader';
import Chat from './Chat';

function DashboardCenter(props) {
  const { 
    conversation,
    client,
    loggedUser,
    contacts,
    setContacts,
    messageSuccess,
    setMessageSuccess,
    setCurrentMessagedId,
    currentMessagedId,
    receiverData,
    setReceiverData,
    receiverClass,
    setReceiverClass } = props

  return (
    <div className="container-fluid h-100 d-flex flex-column p-0">
      <ChatHeader client={client} receiverData={receiverData} currentMessagedId={currentMessagedId} receiverClass={receiverClass}/>
      <Chat
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

export default DashboardCenter;
