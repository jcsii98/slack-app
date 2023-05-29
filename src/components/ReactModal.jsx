import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';

export default function ReactModal(props) {
  const { client,loggedUser,setCreateChannelIsSuccess,onHide,show } = props
  const [newChannelName,setNewChannelName] = useState("")
  const [addMemberList,setAddMemberList] = useState([{ id:loggedUser.id, email:loggedUser.email }])
  const [addMemberInput,setAddMemberInput] = useState("")
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

  const [isLoading,setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const createChannel = async () => {
      try {
          const response = await client.post(`/channels`, {
              "name": newChannelName,
              "user_ids": addMemberList.map( member => {
                member.id
              })
          })

          if(response.data?.errors?.length === 1) {
            console.log("name taken!")
          } else {
            setCreateChannelIsSuccess(true)
          }
          console.log(response)
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
        console.log("user exists!")
        setAddMemberList([...addMemberList, {id: crypto.randomUUID(), email: addMemberInput}])
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
    console.log(idToDelete)
    setAddMemberList(() => {
      return addMemberList.filter( member => {
        return member.id !== idToDelete
      })
    })
  }

  return (
    <Modal
        show={show}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Channel
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className='d-flex flex-column gap-3 needs-validation'>
          <Form.Group className="d-flex flex-row gap-3 justify-content-left align-items-center" controlId="channelName">
            <Form.Label>Channel Name:</Form.Label>
            <Form.Control type="text" placeholder="Channel Name" onChange={handleChannelNameChange} required/>
          </Form.Group>
          <Form.Group className="d-flex flex-row gap-3 justify-content-left align-items-center" controlId="formBasicPassword">
            <Form.Label>Add Member/s:</Form.Label>
            <Form.Control type="email" placeholder="Member Email" onChange={handleMemberInputChange} required/>
            <Button variant="primary" type="button" onClick={handleMemberListChange}>Add Member</Button>
          </Form.Group>
          <ul className='container d-flex flex-column gap-2 border border primary'>
            {addMemberList.map( member => {
              return(
                <li key={member.id} className='d-flex'>
                  <div className='flex-grow-1 text-center'>{member.email}</div>
                  { member.id !== loggedUser.id  ? <button type='button' className='btn btn-danger' onClick={() => handleDeleteMember(member.id)}>Remove</button>
                    : <button disabled type='button' className='btn btn-danger' onClick={() => handleDeleteMember(member.id)}>Remove</button>
                  }
                </li>
              )
            })}
          </ul>
          <div className="d-flex flex-row gap-3 justify-content-end">
            <Button onClick={handleOnHide}>Cancel</Button>
            <Button variant="primary" type="submit">Create Channel</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}