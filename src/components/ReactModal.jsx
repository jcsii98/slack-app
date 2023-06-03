import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';

export default function ReactModal(props) {
  const { client,loggedUser,setCreateChannelIsSuccess,onHide,show,setReceiverData,setCurrentMessagedId,setReceiverClass,setConversation } = props
  const [ newChannelName,setNewChannelName ] = useState("")
  const [ addMemberList,setAddMemberList ] = useState([{ id:loggedUser.id, email:loggedUser.email }])
  const [ addMemberInput,setAddMemberInput ] = useState("")
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  const [ isLoading,setIsLoading ] = useState(false)

  useEffect(() => {
    setAddMemberList(addMemberList)
  },[isLoading])

  const handleSubmit = (e) => {
    e.preventDefault()
    const createChannel = async () => {
      try {
          const response = await client.post(`/channels`, {
              "name": newChannelName,
              "user_ids": addMemberList.map( member => member.id)
          })

          if(response.data?.errors?.length === 1) {
            console.log("name taken!")
          } else {
            setCreateChannelIsSuccess(true)
            setReceiverData(response.data.data)
            setCurrentMessagedId(response.data.data.id)
            setReceiverClass("Channel")
            setConversation([])
          }
      } catch (error) {
          console.log(error)
      }
    }
    createChannel()
    handleOnHide()
  }

  const handleChannelNameChange = (e) => {
    setNewChannelName(e.target.value)
  }
  const handleMemberInputChange = (e) => {
    setAddMemberInput(e.target.value)
  }
  const handleMemberListChange = async () => {
    if(addMemberInput.match(emailRegex)) {
      if(addMemberList.find( user => user.email === addMemberInput)) {
        console.log("user is already on the list!")
        return 0
      }
      const checkIfUserExists = async () => {
        setIsLoading(true)
        try {
            const response = await client.get(`/users`)
            const userList = response.data.data
            return userList.find( user => user.email === addMemberInput)
        } catch (error) {
            console.log(error)
        }
      }
      const userIsFound = await checkIfUserExists()
      
      if(userIsFound) {
        setAddMemberList([...addMemberList, {id: userIsFound.id, email: addMemberInput}])
      } else {
        console.log("user does not exist!")
      }
      setIsLoading(false)
    }
  }
  const handleOnHide = () => {
    setNewChannelName("")
    setAddMemberList([{ id:loggedUser.id, email:loggedUser.email }])
    setAddMemberInput("")
    onHide()
  }
  const handleDeleteMember = (idToDelete) => {
    setAddMemberList(() => {
      return addMemberList.filter( member => {
        return member.id !== idToDelete
      })
    })
  }

  return (
    <Modal
        show={show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={handleOnHide}
    >
      <Modal.Header className='' style={{border: "none", padding: "2em"}} closeButton>
        <Modal.Title id="contained-modal-title-vcenter" style={{fontSize: "1.8rem", fontWeight: "bold"}}>
          Create a Channel
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='container-fluid' style={{padding: "0 1.3em 1em 1.3em", fontSize: "1.5rem"}}>
        <Form autoComplete='off' onSubmit={handleSubmit} className=' d-flex flex-column gap-3 needs-validation'>
          <Form.Group className="d-flex flex-column justify-content-center align-items-start" controlId="channelName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Channel Name" onChange={handleChannelNameChange} style={{height: "3rem"}} required/>
          </Form.Group>
          <Form.Group className="d-flex flex-column justify-content-center align-items-start" style={{fontSize: "1.5rem"}} controlId="formBasicPassword">
            <Form.Label>Add Member/s</Form.Label>
            <Form.Control type="email" placeholder="Member Email" onChange={handleMemberInputChange} style={{height: "3rem"}} required/>
            <Button variant="primary" type="button" onClick={handleMemberListChange} style={{marginTop: "1rem", marginLeft: "auto"}}>Add Member</Button>
          </Form.Group>
          <ul className='container d-flex flex-column gap-2 border border primary' style={{overflow: "auto", maxHeight: "20rem"}}>
            {addMemberList.map( member => {
              return(
                <li key={member.id} className='d-flex justify-content-center gap-3 align-items-center p-2'>
                  <i className="bi bi-person-circle" style={{fontSize: "1.8rem"}}/>
                  <div className='flex-grow-1' style={{fontSize: "1.3rem"}}>{member.email}</div>
                  { member.id !== loggedUser.id  ? <button type='button' className='btn btn-danger' onClick={() => handleDeleteMember(member.id)}>Remove</button>
                    : <button disabled type='button' className='btn btn-danger' onClick={() => handleDeleteMember(member.id)}>Remove</button>
                  }
                </li>
              )
            })}
          </ul>
          <div className="d-flex flex-row gap-3 justify-content-end">
            <Button variant="primary" type="submit">Create Channel</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}