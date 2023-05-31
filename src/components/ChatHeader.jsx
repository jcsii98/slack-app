function ChatHeader(props) {
  const { receiverData,currentMessagedId } = props

  return (
    <div className="container-fluid bg-white d-flex align-items-center border">
      { currentMessagedId ?
          <div className='container-fluid bg-white d-flex align-items-center' style={{height: "4rem"}}>
            <i className="bi bi-person-circle p-3" style={{fontSize: "2.5rem"}}></i>
            <div style={{fontSize: "1.5rem", fontWeight: "bold"}}>{receiverData.name}</div>
          </div>
          :
          <div className='container-fluid d-flex align-items-center' style={{fontSize: "1.5rem", fontWeight: "bold", height: "4rem"}}>New Message</div>
      }
      <div className="p-3" style={{marginLeft: "auto"}}>Members</div>
    </div>
  );
}

export default ChatHeader;
