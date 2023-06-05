import Channels from './Channels';
import DirectMessages from './DirectMessages';
export default function Sidebar(props) {
  const {
    client,
    loggedUser,
    contacts,
    messageSuccess,
    setConversation,
    currentMessagedId,
    setCurrentMessagedId,
    receiverData,
    setReceiverData,
    receiverClass,
    setReceiverClass,
    setMessageSuccess,
  } = props;

  const sendMessage = () => {
    setConversation([]);
    setCurrentMessagedId(0);
    setReceiverData({});
    setMessageSuccess(false);
  };

  // async function handleClick () {
  //   try {
  //     // const response = await client.post(`messages`, {
  //     //   receiver_id: "54",
  //     //   receiver_class: "User",
  //     //   body: "bumili ka ng toyo at suka sa tindahan ni aleng nena"
  //     // })

  //     const response = await client.get(`/users`)
  //     const users = Object.values(response.data)[0]

  //     const userEndpoints = users.map( user => {
  //       return `/messages?receiver_id=${user.id}&receiver_class=User`
  //     })

  //     Promise.allSettled(userEndpoints.map(async (endpoint) =>
  //       await client.get(endpoint)
  //         .catch(error => {
  //           console.log(error)
  //         })
  //     )).then( results => {
  //       // const val = results.reduce( (filtered, result) => {
  //       //   if(result.status === 'fulfilled' && result.value.data.data.length !== 0) {
  //       //     filtered.push(Object.values(result.value.data.data))
  //       //   }
  //       //   return filtered
  //       // },[])
  //       // console.log(val)

  //       // console.log(results)

  //       // const filteredList = getFilteredList(users)

  //       // console.log("filtered list: ")
  //       // console.log(response)
  //     }).catch( error => console.log(error) )

  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  return (
    <div
      className="container-fluid bg-transparent d-flex flex-column gap-3 p-0"
      style={{ width: '16%', color: 'white' }}
    >
      <div
        className="container-fluid d-flex justify-content-start align-items-center gap-5 pt-3 pb-3 nav-tabs"
        style={{ height: '6%' }}
      >
        <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          Avion School
        </div>
        <div
          className="border rounded-circle bg-white d-flex justify-content-center align-items-center"
          style={{ marginLeft: 'auto', width: '2.2rem', height: '2.2rem' }}
        >
          <i
            className="bi bi-pencil-square"
            onClick={sendMessage}
            style={{
              fontSize: '1.1rem',
              color: 'rgb(35,65,67)',
              cursor: 'pointer',
            }}
          ></i>
        </div>
      </div>
      <div className="d-flex flex-column">
        <ul className="container-fluid d-flex flex-column gap-1 pb-3 nav-tabs px-4 m-0">
          <li className="d-flex gap-3 justify-content-start align-items-center">
            <i className="bi bi-chat-text"></i>
            <a className="nav-link" href="#">
              Threads
            </a>
          </li>
          <li className="d-flex gap-3 justify-content-start align-items-center">
            <i className="bi bi-at"></i>
            <a className="nav-link" href="#">
              Mentions & reactions
            </a>
          </li>
          <li className="d-flex gap-3 justify-content-start align-items-center">
            <i className="bi bi-send" style={{ rotate: '45deg' }}></i>
            <a className="nav-link" href="#">
              Drafts & sent
            </a>
          </li>
        </ul>
        <Channels
          setConversation={setConversation}
          client={client}
          loggedUser={loggedUser}
          currentMessagedId={currentMessagedId}
          messageSuccess={messageSuccess}
          receiverClass={receiverClass}
          setReceiverData={setReceiverData}
          setReceiverClass={setReceiverClass}
          setCurrentMessagedId={setCurrentMessagedId}
        />
        <DirectMessages
          setConversation={setConversation}
          client={client}
          loggedUser={loggedUser}
          contacts={contacts}
          messageSuccess={messageSuccess}
          currentMessagedId={currentMessagedId}
          setCurrentMessagedId={setCurrentMessagedId}
          receiverData={receiverData}
          setReceiverData={setReceiverData}
          receiverClass={receiverClass}
          setReceiverClass={setReceiverClass}
        />
        {/* <button onClick={testClick}>Test</button> */}
      </div>
    </div>
  );
}
