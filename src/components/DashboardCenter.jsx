import ChatHeader from './ChatHeader';
import Chat from './Chat';
function DashboardCenter(props) {
  const { client,loggedUser,contacts,setContacts } = props

  return (
    <>
      <div className="chat-container">
        <ChatHeader />
        <Chat client={client} loggedUser={loggedUser} contacts={contacts} setContacts={setContacts}/>
      </div>
    </>
  );
}

export default DashboardCenter;
