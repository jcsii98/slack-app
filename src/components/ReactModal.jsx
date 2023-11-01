import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import api from '../api.js';
import { useEffect, useRef, useState } from 'react';

export default function ReactModal(props) {
  const {
    loggedUser,
    setCreateChannelIsSuccess,
    onHide,
    show,
    setReceiverData,
    setCurrentMessagedId,
    setReceiverClass,
    setConversation,
  } = props;
  const [newChannelName, setNewChannelName] = useState('');
  const [addMemberList, setAddMemberList] = useState([
    { id: loggedUser.id, email: loggedUser.email },
  ]);
  const [addMemberInput, setAddMemberInput] = useState('');
  const emailRegex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const [isLoading, setIsLoading] = useState(false);
  const [alert,setAlert] = useState({status: "", message: ""})
  const isLoadingRef = useRef(false)

  useEffect(() => {
    setAddMemberList(addMemberList);
  }, [isLoading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const createChannel = async () => {
      try {
        const response = await api.post(`/channels`, {
          name: newChannelName,
          user_ids: addMemberList.map((member) => member.id),
        });

        if (response.data?.errors?.length === 1) {
          setAlert({status: "error", message: "Channel name already taken!"})
        } else {
          setCreateChannelIsSuccess(true);
          setReceiverData(response.data.data);
          setCurrentMessagedId(response.data.data.id);
          setReceiverClass('Channel');
          setConversation([]);
          setAlert({status: "", message: ""})
          handleOnHide();
        }
      } catch (error) {
        console.log(error);
      }
    };
    if(addMemberList.length === 1) {
      setAlert({status: "error", message: "Channel must have 2 or more members!"})
      return
    }
    createChannel();
  };

  const handleChannelNameChange = (e) => {
    setNewChannelName(e.target.value);
  };
  const handleMemberInputChange = (e) => {
    setAddMemberInput(e.target.value);
  };
  const handleMemberListChange = async () => {
    if (!addMemberInput.match(emailRegex)) {
      setAlert({status: "error", message: "Invalid email format!"})
      return;
    }

    const existingUser = addMemberList.find(
      (user) => user.email === addMemberInput
    );
    if (existingUser) {
      setAlert({status: "error", message: "User is already on the list!"})
      return;
    }

    try {
      isLoadingRef.current = true
      setAlert({status: "loading", message: "Checking if recipient exists..."})
      const response = await api.get(`/users`);
      const userList = response.data.data;
      const userIsFound = userList.find(
        (user) => user.email === addMemberInput
      );
      if (userIsFound) {
        setAddMemberList([
          ...addMemberList,
          { id: userIsFound.id, email: addMemberInput },
        ]);
        setAlert({status: "success", message: "User added!"})
      } else {
        setAlert({status: "error", message: "User does not exist!"})
      }
    } catch (error) {
      console.log(error);
    } finally {
      isLoadingRef.current = false
    }
  };

  const handleOnHide = () => {
    setNewChannelName('');
    setAddMemberList([{ id: loggedUser.id, email: loggedUser.email }]);
    setAddMemberInput('');
    setAlert({status: "", message: ""})
    onHide();
  };
  const handleDeleteMember = (idToDelete) => {
    setAddMemberList(() => {
      return addMemberList.filter((member) => {
        return member.id !== idToDelete;
      });
    });
  };

  return (
    <Modal
      show={show}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className='p-4'
    >
      <Modal.Header style={{border: "none"}}>
        <Modal.Title id="contained-modal-title-vcenter">
          Create Channel
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={handleSubmit}
          className="d-flex flex-column gap-3 needs-validation"
        >
          <Form.Group
            className="form-floating d-flex flex-row gap-3 justify-content-left align-items-center"
          >
            <Form.Control
              id="channelInput"
              style={{height: "3.5rem", fontSize: "1.2rem"}}
              type="text"
              placeholder="Channel Name"
              onChange={handleChannelNameChange}
              required
            />
            <Form.Label htmlFor="channelInput">Channel Name</Form.Label>
          </Form.Group>
          <Form.Group
            className="form-floating d-flex flex-row gap-3 justify-content-left align-items-start"
          >
            <Form.Control
              id="memberInput"
              style={{height: "3.5rem", fontSize: "1.2rem"}}
              type="email"
              placeholder="Member Email"
              onChange={handleMemberInputChange}
              required
            />
            <Form.Label htmlFor="memberInput">User Email</Form.Label>
            
          </Form.Group>
          <Button
              variant="primary"
              type="button"
              style={{fontSize: "0.8rem"}}
              onClick={handleMemberListChange}
            >
              Add Member
            </Button>
          { !alert.status ? <></> :
              alert.status === "error" ? 
                <div className="d-flex justify-content-center align-items-center gap-2 alert alert-danger p-2" role="alert" style={{fontWeight: "bold"}}>
                  <i className="bi bi-x-circle-fill"></i>
                  <div>
                    {alert.message}
                  </div>
                </div>
                :
                alert.status === "success" ?
                <div className="d-flex justify-content-center align-items-center gap-2 alert alert-success d-flex align-items-center p-2" role="alert" style={{fontWeight: "bold"}}>
                  <i className="bi bi-check-circle-fill"></i>
                  <div>
                    {alert.message}
                  </div>
                </div> 
                :
                <div className="d-flex justify-content-center align-items-center gap-2 alert alert-primary d-flex align-items-center p-2" role="alert" style={{fontWeight: "bold"}}>
                  <div className="spinner-border text-primary" role="status">
                  </div>
                  <div>
                    {alert.message}
                  </div>
                </div>
          }
          <div className='container-fluid' style={{fontSize: "1.5rem"}}>Members:</div>
          <ul className="container d-flex flex-column justify-content-center align-items-start gap-2 border primary">
            {addMemberList.map((member) => {
              return (
                <li key={member.id} className="container-fluid d-flex justify-content-start align-items-center gap-5">
                  <div className='d-flex gap-2 justify-content-start align-items-center'>
                    <i className="bi bi-person-circle" style={{fontSize: "1.7rem"}}></i>
                    <div className="flex-grow-1 text-center">{member.email}</div>
                  </div>
                  
                  {member.id !== loggedUser.id ? (
                    <button
                      style={{marginLeft: "auto"}}
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDeleteMember(member.id)}
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      style={{marginLeft: "auto"}}
                      disabled
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDeleteMember(member.id)}
                    >
                      Remove
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
          <div className="d-flex flex-row gap-3 justify-content-end">
            <Button onClick={handleOnHide}>Cancel</Button>
            <Button variant="primary" type="submit">
              Create Channel
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
