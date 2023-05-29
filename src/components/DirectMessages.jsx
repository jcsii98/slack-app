import { useState,useEffect } from "react";
import List from "./List"

export default function DirectMessages(props) {
  const { client,loggedUser,contacts,messageSuccess } = props
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
  },[messageSuccess])

  return (
    <div className="container bg-transparent p-0">
      {data && <List title={"Direct Messages"} classType={"d-none"} data={data}/>}
    </div>
  );
}