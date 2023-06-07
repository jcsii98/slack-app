import Channels from './Channels';
import DirectMessages from './DirectMessages';
export default function Sidebar(props) {
    const {
        loggedUser,
        contacts,
        messageSuccess,
        setConversation,
        currentMessagedId,
        setCurrentMessagedId,
        receiverData,
        setReceiverData,
        receiverClass,
        setReceiverClass,
        setMessageSuccess,
        setAlert,
    } = props;

    const sendMessage = () => {
        setConversation([]);
        setCurrentMessagedId(0);
        setReceiverData({});
        setMessageSuccess(false);
    };

    return (
        <div
            className='container-fluid bg-transparent d-flex flex-column gap-3 p-0'
            style={{width: '16%', color: 'white'}}
        >
            <div
                className='container-fluid d-flex justify-content-start align-items-center gap-5 pt-3 pb-3 nav-tabs'
                style={{height: '6%'}}
            >
                <div style={{fontSize: '1.2rem', fontWeight: 'bold'}}>
                    Avion School
                </div>
                <div
                    className='border rounded-circle bg-white d-flex justify-content-center align-items-center'
                    style={{
                        marginLeft: 'auto',
                        width: '2.2rem',
                        height: '2.2rem',
                    }}
                >
                    <i
                        className='bi bi-pencil-square'
                        onClick={sendMessage}
                        style={{
                            fontSize: '1.1rem',
                            color: 'rgb(35,65,67)',
                            cursor: 'pointer',
                        }}
                    ></i>
                </div>
            </div>
            <div className='d-flex flex-column'>
                <ul className='nav-tabs container-fluid d-flex flex-column gap-1 pb-3 px-4 m-0'>
                    <li className='padding-lr-1 nav-link sidebar-item d-flex gap-3 justify-content-start align-items-center'>
                        <i className='bi bi-chat-text'></i>
                        <a className='nav-link border-0' href='#'>
                            Threads
                        </a>
                    </li>
                    <li className='padding-lr-1 nav-link sidebar-item d-flex gap-3 justify-content-start align-items-center'>
                        <i className='bi bi-at'></i>
                        <a className='nav-link border-0' href='#'>
                            Mentions & reactions
                        </a>
                    </li>
                    <li className='padding-lr-1 nav-link sidebar-item d-flex gap-3 justify-content-start align-items-center'>
                        <i className='bi bi-send' style={{rotate: '45deg'}}></i>
                        <a className='nav-link border-0' href='#'>
                            Drafts & sent
                        </a>
                    </li>
                </ul>
                <Channels
                    setConversation={setConversation}
                    setAlert={setAlert}
                    loggedUser={loggedUser}
                    currentMessagedId={currentMessagedId}
                    messageSuccess={messageSuccess}
                    receiverClass={receiverClass}
                    setReceiverData={setReceiverData}
                    setReceiverClass={setReceiverClass}
                    setCurrentMessagedId={setCurrentMessagedId}
                />
                <DirectMessages
                    setConversation={setConversation}
                    setAlert={setAlert}
                    loggedUser={loggedUser}
                    contacts={contacts}
                    messageSuccess={messageSuccess}
                    currentMessagedId={currentMessagedId}
                    setCurrentMessagedId={setCurrentMessagedId}
                    receiverData={receiverData}
                    setReceiverData={setReceiverData}
                    receiverClass={receiverClass}
                    setReceiverClass={setReceiverClass}
                />
            </div>
        </div>
    );
}
