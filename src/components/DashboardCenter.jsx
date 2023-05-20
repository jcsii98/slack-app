import ChatHeader from './ChatHeader';
import Chat from './Chat';
function DashboardCenter() {
  return (
    <>
      <div className="chat-container">
        <ChatHeader />
        <Chat />
      </div>
    </>
  );
}

export default DashboardCenter;
