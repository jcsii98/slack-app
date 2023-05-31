import List from "./List"
import ReactModal from "../components/ReactModal"
import { useEffect, useState } from "react";

export default function Channels(props) {
  const { client,loggedUser,setConversation,currentMessagedId,messageSuccess,receiverClass,setReceiverData,setReceiverClass,setCurrentMessagedId } = props
  const [ modalShow, setModalShow ] = useState(false);
  const [ data,setData ] = useState([])
  const [ createChannelIsSuccess, setCreateChannelIsSuccess ] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const response = await client.get(`/channels`)
      console.log(response)
      setData(() => {
        return response.data.data ?? []
      })
    }
    if(receiverClass === "Channel") handleClick(currentMessagedId)
    getData()
  },[createChannelIsSuccess,messageSuccess])

  const handleClick = async (id) => {
    const res = await client.get(`/channels/${id}`)
    setReceiverData(res.data.data)
    setReceiverClass("Channel")
    console.log(res.data.data)
    setCurrentMessagedId(id)
    console.log("receiver id: " + id)
    console.log("receiver class: " + receiverClass)
    const response = await client.get(`/messages?receiver_id=${id}&receiver_class=Channel`)
    console.log(response)
    setConversation(response.data.data)
  } 

  return (
    <div className="container-fluid nav-tabs px-2 pb-2">
      <ReactModal 
        client={client}
        loggedUser={loggedUser}
        setCreateChannelIsSuccess={setCreateChannelIsSuccess}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      {data && 
        <List
          handleClick={handleClick}
          setConversation={setConversation}
          client={client}
          title={"Channels"}
          data={data}
          callback={setModalShow}
        />
      }
    </div>
  );
}