import SidebarList from "./SidebarList";
import axios from 'axios';

export default function Sidebar(props) {

  const { config,setConfig } = props

  async function handleClick () {
    const client = axios.create({
      baseURL: "http://206.189.91.54/api/v1",
      headers: {
        "access-token": config.accessToken,
        "client": config.client,
        "expiry": config.expiry,
        "uid": config.uid
      }
    });

    console.log(client)

    try {
      // const response = await client.post(`messages`, {
      //   receiver_id: "3422",
      //   receiver_class: "User",
      //   body: "paano mag luto ng sinigang na isda?"
      // })
      const response = await client.get(`/messages?receiver_id=3446&receiver_class=User`)
      console.log(response) 
    } catch (error) {
      console.log(error)
    }
  }

  return (
      <div className="sidebar-container">
        <div className="sidebar-header sidebar-item nav-item nav nav-tabs">
          Avion School
        </div>
        <ul className="sidebar-item nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Threads
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Later
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Mentions & reactions
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Drafts & sent
            </a>
          </li>
        </ul>
        <button onClick={handleClick} placeholder="click me!" />
        {/* <SidebarList title="Channels" type="Channels" user={userData}/>
        <SidebarList title="Direct Messages" type="DirectMessages" user={userData}/> */}
      </div>
  );
}
