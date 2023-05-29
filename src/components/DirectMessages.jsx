import { useState } from "react";
import List from "./List"

export default function DirectMessages(props) {
  const { client,loggedUser } = props
  const [ data,setData ] = useState([])

  return (
    <div className="container bg-transparent p-0">
      {data && <List title={"Direct Messages"} classType={"d-none"} data={data}/>}
    </div>
  );
}