import { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button'
import ReactModal from "../components/ReactModal"

export default function SidebarList(props) {
    const { title, type, client } = props
    const [ data,setData ] = useState([])
    const [modalShow, setModalShow] = useState(false);

    useEffect(() => {
        getData()
    },[])

    async function getData() {
        try {
            const response = await client.get(`/${type}`)
            console.log(response)
            if(response.data.errors !== "No available channels.") setData(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleOnClick = () => {
        // gets otherUser data and displays it to Chat component
    }

    const removeUser = () => {

    }

    const createChannel = async () => {
        try {
            const response = await client.get(`/${type}`, {
                "name": newChannelName,
                "user_ids": usersToAdd
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            { type === "channels" && <ReactModal show={modalShow} onHide={() => setModalShow(false)}/> }
            <h1>{title}</h1>
            <ul className="sidebar-item nav nav-tabs flex-grow-1">
                {data.length === 0 && `No available ${type}.`}
                {data.map( dat => {
                    return (
                        <li className="nav-item">
                            <button onClick={handleOnClick}>User</button>
                            <button onClick={removeUser}/>
                        </li>
                    )
                } )}
                { type === "channels" && <Button variant="primary" onClick={() => setModalShow(true)}>Create {type}</Button>}
            </ul>
        </div>
    );
}