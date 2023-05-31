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
    receiverData,
    setReceiverData,
    receiverClass } = props
  const [ data,setData ] = useState([])

  useEffect(() => {
    const getData = () => {
      setData(() => {
        const localUserContact = contacts.find( data => {
          return data.userId === loggedUser.id
        })
        return localUserContact.contacts
      })
    }
    getData()
    console.log("current message success: ")
    console.log(messageSuccess)
    console.log("current messaged id: ")
    console.log(currentMessagedId)
    if(currentMessagedId && receiverClass !== "Channel") handleClick(currentMessagedId)
  },[messageSuccess])

  const handleClick = async (id) => {
    console.log("current messaged id: " + id)
    setCurrentMessagedId(id)
    const response = await client.get(`/messages?receiver_id=${id}&receiver_class=User`)
    console.log(response)
    const userReceiver = response.data.data[0].receiver
    setReceiverData({ id: userReceiver.id, name: userReceiver.email })
    setConversation(Array.from(response.data.data))
  } 

  return (
    <div className="container-fluid p-0 nav-tabs">
      {data && <List handleClick={handleClick} setConversation={setConversation} client={client} title={"Direct Messages"} classType={"d-none"} data={data}/>}
    </div>
  );
}