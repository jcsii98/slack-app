import { useEffect, useRef } from "react"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import parse from 'html-react-parser';

export default function Message(props) {
  const { conversation,loggedUser } = props
  const bottomRef = useRef(null)

  useEffect(() => {
    console.log(loggedUser)
    bottomRef.current?.scrollIntoView({behavior: 'smooth'})
    console.log(conversation)
  },[conversation])

  const getHourAndMinutes = (dateToEdit) => {
    const newDateAndTime = new Date(dateToEdit);
    const dateString = newDateAndTime.toString()
    const dateAndTimeArray = dateString.split(" ")
    const hourAndMinutes = dateAndTimeArray[4].substring(0,5)
    return hourAndMinutes
  }

  const getDateandTime = (dateToEdit) => {
    const newDateAndTime = new Date(dateToEdit);
    const dateString = newDateAndTime.toString()
    const dateAndTimeArray = dateString.split(" ")
    const hourAndMinutes = dateAndTimeArray[4].substring(0,5)
    const fullDateAndtime = `${dateAndTimeArray[1]} ${dateAndTimeArray[2]}, ${dateAndTimeArray[3]} at ${hourAndMinutes}`
    return fullDateAndtime
  }

  return (
    <div className="container-fluid flex-grow-1" style={{overflow: "auto", maxHeight: "40rem", maxWidth: "100%"}}>
      {conversation?.length === 0 && <></>}
      {conversation?.map( message => {
        return(
          message.sender.email === loggedUser.email ?
          <div key={message.id} className="d-flex flex-row justify-content-end gap-3 px-3 py-2" style={{maxWidth: "45%", marginLeft: "auto"}}>
            <div className="d-flex flex-column justify-content-center gap-2" style={{maxWidth: "100%"}}>
              <div className="d-flex flex-row gap-3 align-items-center" style={{marginLeft: "auto"}}>
                <div style={{fontSize: "1.2rem",fontWeight: "bold"}}>{message.sender.email}</div>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 350 }}
                  style={{position: "fixed"}}
                  overlay={(
                    <Tooltip id="button-tooltip" style={{position: "fixed"}}>
                      {getDateandTime(message.created_at)}
                    </Tooltip>
                  )}
                >
                  <div style={{fontSize: "0.9rem"}}>{getHourAndMinutes(message.created_at)}</div>
                </OverlayTrigger>
              </div>
              <div className="message-container border rounded-4" style={{padding: "1em 1em 0 1em", marginLeft: "auto", backgroundColor: "#8AB8BC", color: "black"}}>
                {parse(message.body)}
              </div>
            </div>
            <i className="bi bi-person-circle" style={{fontSize: "3rem"}}></i>
            <div ref={bottomRef}/>
          </div>
          :
          <div key={message.id} className="d-flex flex-row gap-3 px-3 py-2" style={{maxWidth: "45%"}}>
            <i className="bi bi-person-circle" style={{fontSize: "3rem"}}></i>
            <div className="d-flex flex-column justify-content-center gap-2" style={{maxWidth: "100%"}}>
              <div className="d-flex flex-row gap-3 align-items-center">
                <div style={{fontSize: "1.2rem",fontWeight: "bold"}}>{message.sender.email}</div>
                <OverlayTrigger
                  placement="top"
                  delay={{ show: 250, hide: 350 }}
                  style={{position: "fixed"}}
                  overlay={(
                    <Tooltip id="button-tooltip" style={{position: "fixed"}}>
                      {getDateandTime(message.created_at)}
                    </Tooltip>
                  )}
                >
                  <div style={{fontSize: "0.9rem"}}>{getHourAndMinutes(message.created_at)}</div>
                </OverlayTrigger>
              </div>
              <div className="message-container border rounded-4" style={{marginRight: "auto", padding: "1em 1em 0 1em", backgroundColor: "#8AB8BC", color: "black"}}>
                {parse(message.body)}
              </div>
            </div>
            <div ref={bottomRef}/>
          </div>
        )
      })}
    </div>
  )
}
