import List from "./List"
import ReactModal from "../components/ReactModal"
import { useEffect, useState } from "react";

export default function Channels(props) {
  const { client,loggedUser } = props
  const [ modalShow, setModalShow ] = useState(false);
  const [ data,setData ] = useState([])
  const [ createChannelIsSuccess, setCreateChannelIsSuccess ] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const response = await client.get(`/channels`)
      console.log(response)
      setData(response.data.data)
    }
    getData()
  },[createChannelIsSuccess])

  return (
    <ul className="container bg-transparent p-0">
      <ReactModal client={client} loggedUser={loggedUser} setCreateChannelIsSuccess={setCreateChannelIsSuccess}  show={modalShow} onHide={() => setModalShow(false)}/>
      {data && <List title={"Channels"} type={"channels"} data={data} callback={setModalShow}/>}
    </ul>
  );
}