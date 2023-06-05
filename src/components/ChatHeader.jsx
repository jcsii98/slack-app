import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useRef, useState } from 'react';
function ChatHeader(props) {
  const { client, receiverData, currentMessagedId, receiverClass } = props;
  const [modalShow, setModalShow] = useState(false);
  const [channelData, setChannelData] = useState({});
  const [channelMembers, setChannelMembers] = useState([]);
  const [userAdded, setUserAdded] = useState(false);
  const inputValueRef = useRef('');
  useEffect(() => {
    setChannelMembers(channelMembers);
    setChannelData(channelData);
  }, [modalShow, userAdded]);
  const seeMembers = async () => {
    const response = await client.get(`/channels/${receiverData.id}`);
    const res = await client.get('/users');
    const allUsers = res.data.data;
    const getDateandTime = (dateToEdit) => {
      const newDateAndTime = new Date(dateToEdit);
      const dateString = newDateAndTime.toString();
      const dateAndTimeArray = dateString.split(' ');
      const hourAndMinutes = dateAndTimeArray[4].substring(0, 5);
      const fullDateAndtime = `${dateAndTimeArray[1]} ${dateAndTimeArray[2]}, ${dateAndTimeArray[3]} at ${hourAndMinutes}`;
      return fullDateAndtime;
    };
    const ownerUser = allUsers.find(
      (user) => user.id === response.data.data.owner_id
    );
    setChannelData({
      id: response.data.data.id,
      name: response.data.data.name,
      owner: ownerUser.email,
      created_at: getDateandTime(response.data.data.created_at),
    });
    const rawMembersData = response.data.data.channel_members;
    const rawMembersId = rawMembersData.map((member) => member.user_id);
    const membersData = rawMembersId.map((id) => {
      return allUsers.find((user) => user.id === id);
    });
    setChannelMembers(membersData);
    setModalShow(true);
  };
  const addMember = async () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(inputValueRef.current)) {
      try {
        const userResponse = await client.get('/users');
        const allUsers = userResponse.data.data;
        const userData = allUsers.find(
          (user) => user.email === inputValueRef.current
        );

        const addMemberResponse = await client.post('/channel/add_member', {
          id: currentMessagedId,
          member_id: userData.id,
        });
        const channelDataResponse = await client.get(
          `/channels/${currentMessagedId}`
        );
        const rawMembersData = channelDataResponse.data.data.channel_members;
        const rawMembersId = rawMembersData.map((member) => member.user_id);
        const membersData = rawMembersId.map((id) => {
          return allUsers.find((user) => user.id === id);
        });
        setChannelMembers(membersData);
        setUserAdded(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('NOT AN EMAIL!');
    }
  };
  const handleChange = (event) => {
    const value = event.target.value;
    inputValueRef.current = value;
  };
  return (
    <>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ maxHeight: '45rem', marginTop: '5rem' }}
      >
        <Modal.Header
          closeButton
          style={{ border: 'none', paddingRight: '2rem' }}
        >
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="d-flex gap-2"
            style={{
              fontSize: '1.5rem',
              marginLeft: '1rem',
              marginTop: '1.5rem',
            }}
          >
            <i className="bi bi-people-fill" style={{ fontSize: '1.5rem' }} />
            <div>{channelData.name}</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body
          className="container-fluid p-0 d-flex flex-column gap-4"
          style={{
            fontSize: '1.2rem',
            overflow: 'hidden',
            minHeight: '32rem',
            maxHeight: '32rem',
          }}
        >
          <Tabs
            className="d-flex flex-row"
            defaultActiveKey={2}
            id="uncontrolled-tab-example"
            style={{ padding: '1rem 1rem 0rem 1rem' }}
          >
            <Tab
              className="container-fluid rounded p-2"
              eventKey={1}
              title="About"
            >
              <div className="container-fluid border rounded p-4">
                <div className="container-fluid d-flex flex-column justify-content-center align-items-start gap-0">
                  <h5>Managed By:</h5>
                  <p>{channelData.owner}</p>
                </div>
                <hr></hr>
                <div className="container-fluid d-flex flex-column justify-content-center align-items-start gap-0">
                  <h5>Created Date:</h5>
                  <p>{channelData.created_at}</p>
                </div>
              </div>
            </Tab>
            <Tab
              className="p-4 container-fluid d-flex flex-column gap-3"
              eventKey={2}
              title={`Members ${channelMembers.length}`}
            >
              <div className="container-fluid d-flex p-0 gap-2">
                <input
                  className="flex-grow-1 p-2"
                  style={{ height: '20%' }}
                  type="text"
                  onChange={handleChange}
                ></input>
                <button
                  className="btn btn-primary"
                  style={{ width: '20%' }}
                  onClick={addMember}
                >
                  Add
                </button>
              </div>
              <ul
                className="d-flex flex-column justify-content-center  align-items-start px-4 gap-3"
                style={{ overflow: 'auto', maxHeight: '20rem' }}
              >
                {channelMembers.map((member) => {
                  return (
                    <li
                      key={member.id}
                      className="d-flex justify-content-center align-items-center gap-2"
                    >
                      <i
                        className="bi bi-person-circle"
                        style={{ fontSize: '1.5rem' }}
                      ></i>
                      <div style={{ fontSize: '1.5rem' }}>{member.email}</div>
                    </li>
                  );
                })}
              </ul>
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <div style={{ marginRight: 'auto' }}>
            Channel ID: {channelData.id}
          </div>
        </Modal.Footer>
      </Modal>

      <div className="container-fluid bg-white d-flex align-items-center border">
        {currentMessagedId ? (
          <div
            className="container-fluid bg-white d-flex align-items-center"
            style={{ height: '4rem' }}
          >
            <i
              className="bi bi-person-circle p-3"
              style={{ fontSize: '2.5rem' }}
            ></i>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
              {receiverData.name}
            </div>
          </div>
        ) : (
          <div
            className="container-fluid d-flex align-items-center"
            style={{ fontSize: '1.5rem', fontWeight: 'bold', height: '4rem' }}
          >
            New Message
          </div>
        )}
        {receiverClass === 'Channel' && (
          <div
            className="btn p-2 border"
            style={{ marginLeft: 'auto', cursor: 'pointer' }}
            onClick={seeMembers}
          >
            Members
          </div>
        )}
      </div>
    </>
  );
}
export default ChatHeader;
