import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useRef, useState } from 'react';

function ChatHeader(props) {
  const { client,receiverData,currentMessagedId,receiverClass } = props
  const [ modalShow, setModalShow ] = useState(false);
  const [ channelMembers,setChannelMembers ] = useState([])
  const [ userAdded,setUserAdded ] = useState(false)
  const inputValueRef = useRef("")

  useEffect(() => {
    setChannelMembers(channelMembers)
  }, [modalShow, userAdded])

  const seeMembers = async () => {
    const response = await client.get(`/channels/${receiverData.id}`)
    const res = await client.get('/users')
    const allUsers = res.data.data
    const rawMembersData = response.data.data.channel_members
    const rawMembersId = rawMembersData.map( member => member.user_id)
    const membersData = rawMembersId.map( id => {
      return allUsers.find( user => user.id === id )
    })
    setChannelMembers(membersData)
    setModalShow(true)
  }

  const addMember = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (emailPattern.test(inputValueRef.current)) {
      try {
        const userResponse = await client.get("/users")

        const allUsers = userResponse.data.data;
        const userData = allUsers.find((user) => user.email === inputValueRef.current);

        const addMemberResponse = await client.post("/channel/add_member",{
        "id": currentMessagedId,
        "member_id": userData.id
        })
        const channelDataResponse = await client.get(`/channels/${currentMessagedId}`)
        const rawMembersData = channelDataResponse.data.data.channel_members
        const rawMembersId = rawMembersData.map( member => member.user_id)
        const membersData = rawMembersId.map( id => {
          return allUsers.find( user => user.id === id )
        })
        setChannelMembers(membersData)
        setUserAdded(true)
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log("NOT AN EMAIL!")
    }
  }

  const handleChange = (event) => {
    const value = event.target.value;
    inputValueRef.current = value
  };

  return (
    <>
      <Modal
        show={modalShow}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Members
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='d-flex flex-column gap-4'>
        <div className='container-fluid d-flex p-0 gap-2'>
          <input className='flex-grow-1' type="text" onChange={handleChange}></input>
          <button onClick={addMember}>Add</button>
        </div>
        <ul className='d-flex flex-column justify-content-center align-items-start px-1 gap-3'>
          {channelMembers.map( member => {
            return (
              <li key={member.id} className='d-flex justify-content-center align-items-center gap-2'>
                <i className="bi bi-person-circle" style={{fontSize: "2rem"}}></i>
                <div style={{fontSize: "2rem"}}>{member.email}</div>
              </li>
            )
          })}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => setModalShow(false)}>Close</Button>
      </Modal.Footer>
     </Modal>
     <div className="container-fluid bg-white d-flex align-items-center border">
      { currentMessagedId ?
          <div className='container-fluid bg-white d-flex align-items-center' style={{height: "4rem"}}>
            <i className="bi bi-person-circle p-3" style={{fontSize: "2.5rem"}}></i>
            <div style={{fontSize: "1.5rem", fontWeight: "bold"}}>{receiverData.name}</div>
          </div>
          :
          <div className='container-fluid d-flex align-items-center' style={{fontSize: "1.5rem", fontWeight: "bold", height: "4rem"}}>New Message</div>
      }
      { receiverClass === "Channel" && <div className="p-3" style={{marginLeft: "auto",cursor: "pointer"}} onClick={seeMembers}>Members</div>}
    </div>
    </>
  );
}

export default ChatHeader;
