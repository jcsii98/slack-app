import DirectMessagesHeader from './DirectMessagesHeader.jsx';
import Channels from './Channels.jsx';
function Chat() {
  // message = receiver_id, receiver_class, body

  return (
    <>
      <div className="chat-main-container">
        <DirectMessagesHeader />
        <div className="messages-container"></div>
        <div className="chat-footer">
          <div className="chat-input-container">
            <div className="chat-input-header">chat symbols here</div>
            <div className="chat-input-form-container">
              <form className="chat-input-form">
                <input placeholder="Type a message..." type="text"></input>
              </form>
            </div>
            <div className="chat-input-footer">
              <button type="button"></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
