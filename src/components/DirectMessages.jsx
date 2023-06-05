import { useState,useEffect } from "react";
import List from "./List"

export default function DirectMessages(props) {
  const { 
    client,
    loggedUser,
    contacts,
    messageSuccess,
    setConversation,
    currentMessagedId,
    setCurrentMessagedId,
    setReceiverData,
    receiverClass,
    setReceiverClass,
    receiverData } = props
  const [ data,setData ] = useState([])
  const [ clicked, setClicked ] = useState(false) 

  useEffect(() => {
    setReceiverData(receiverData)
  }, [clicked])

  useEffect(() => {
    const getData = () => {
      setData(() => {
        const localUserContact = Object.entries(contacts[loggedUser.id])
        return localUserContact
      })
    }
    getData()
    if(currentMessagedId && receiverClass !== "Channel") userClick(currentMessagedId)
  },[messageSuccess])

  const userClick = async (id) => {
    setClicked(true)
    setCurrentMessagedId(id)
    const response = await client.get(`/messages?receiver_id=${id}&receiver_class=User`)
    setReceiverClass("User")
    const userReceiver = response.data.data[0].receiver
    setReceiverData({ id: userReceiver.id, name: userReceiver.email })
    setConversation(Array.from(response.data.data))
    setClicked(false)
  } 

  return (
    <div className="container-fluid p-0 nav-tabs">
      {data && <List handleClick={userClick} setConversation={setConversation} client={client} title={"Direct Messages"} classType={"d-none"} data={data}/>}
    </div>
  );
}