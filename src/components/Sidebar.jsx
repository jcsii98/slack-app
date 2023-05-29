import axios from 'axios';
import Channels from "./Channels"
import DirectMessages from "./DirectMessages";

export default function Sidebar(props) {
  const { loggedUser,config } = props

  const client = axios.create({
    baseURL: "http://206.189.91.54/api/v1",
    headers: {
      "access-token": config.accessToken,
      "client": config.client,
      "expiry": config.expiry,
      "uid": config.uid
    }
  });

  const handleOnClick = () => {
      // gets otherUser data and displays it to Chat component
  }

  const testClick = async () => {
    const response = await client.get(`/channels`)
    console.log(response)
    console.log(response.data.data)
  }

  async function handleClick () {
    try {
      // const response = await client.post(`messages`, {
      //   receiver_id: "54",
      //   receiver_class: "User",
      //   body: "bumili ka ng toyo at suka sa tindahan ni aleng nena"
      // })

      const response = await client.get(`/users`)
      const users = Object.values(response.data)[0]

      const userEndpoints = users.map( user => {
        return `/messages?receiver_id=${user.id}&receiver_class=User`
      })

      Promise.allSettled(userEndpoints.map(async (endpoint) => 
        await client.get(endpoint)
          .catch(error => {
            console.log(error)
          }) 
      )).then( results => {
        // const val = results.reduce( (filtered, result) => {
        //   if(result.status === 'fulfilled' && result.value.data.data.length !== 0) {
        //     filtered.push(Object.values(result.value.data.data))
        //   }
        //   return filtered
        // },[])
        // console.log(val)

        // console.log(results)

        // const filteredList = getFilteredList(users)

        // console.log("filtered list: ")
        // console.log(response)
      }).catch( error => console.log(error) )

      

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
        <Channels client={client} loggedUser={loggedUser}/>
        <DirectMessages client={client} loggedUser={loggedUser}/>
        {/* <button onClick={testClick}>Test</button> */}
      </div>
  );
}
