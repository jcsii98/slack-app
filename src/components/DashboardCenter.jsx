import ChatHeader from './ChatHeader';
import Chat from './Chat';
function DashboardCenter(props) {
  const { client,loggedUser,contacts,setContacts,messageSuccess, setMessageSuccess } = props

  return (
    <>
      <div className="chat-container">
        <ChatHeader />
        <Chat
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

export default DashboardCenter;
