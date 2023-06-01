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
    setReceiverClass } = props
  const [ data,setData ] = useState([])

  useEffect(() => {
    console.log("###################################################")
    console.log("in direct messages...")
    const getData = () => {
      setData(() => {
        const localUserContact = contacts.find( data => {
          return data.userId === loggedUser.id
        })
        return localUserContact.contacts
      })
    }
    getData()
    if(currentMessagedId && receiverClass !== "Channel") userClick(currentMessagedId)
  },[messageSuccess])

  const userClick = async (id) => {
    console.log("current messaged id: " + id)
    setCurrentMessagedId(id)
    const response = await client.get(`/messages?receiver_id=${id}&receiver_class=User`)
    console.log(response)
    setReceiverClass("User")
    const userReceiver = response.data.data[0].receiver
    setReceiverData({ id: userReceiver.id, name: userReceiver.email })
    setConversation(Array.from(response.data.data))
  } 

  return (
    <div className="container-fluid p-0 nav-tabs">
      {data && <List handleClick={userClick} setConversation={setConversation} client={client} title={"Direct Messages"} classType={"d-none"} data={data}/>}
    </div>
  );
}