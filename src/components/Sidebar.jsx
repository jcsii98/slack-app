import Channels from './Channels';
import DirectMessages from './DirectMessages';
import {useState} from 'react';
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
    const [activeButton, setActiveButton] = useState(null);
    const handleButtonClick = (buttonId) => {
        setActiveButton(buttonId);
    };
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
                    <li
                        className={`padding-lr-1 nav-link sidebar-item d-flex gap-3 justify-content-start align-items-center ${
                            activeButton === 'threads' ? 'active' : ''
                        }`}
                    >
                        <button
                            type='button'
                            className='sidebar-btn bg-transparent nav-link border-0'
                            style={{color: 'white'}}
                            onClick={() => handleButtonClick('threads')}
                        >
                            <i className='bi bi-chat-text'></i>
                            <div className='sidebar-btn-label'>Threads</div>
                        </button>
                    </li>
                    <li
                        className={`padding-lr-1 nav-link sidebar-item d-flex gap-3 justify-content-start align-items-center ${
                            activeButton === 'mentions' ? 'active' : ''
                        }`}
                    >
                        <button
                            type='button'
                            className='sidebar-btn bg-transparent nav-link border-0'
                            style={{color: 'white'}}
                            onClick={() => handleButtonClick('mentions')}
                        >
                            <i className='bi bi-at'></i>

                            <div className='sidebar-btn-label'>
                                Mentions & reactions
                            </div>
                        </button>
                    </li>
                    <li
                        className={`padding-lr-1 nav-link sidebar-item d-flex gap-3 justify-content-start align-items-center ${
                            activeButton === 'drafts' ? 'active' : ''
                        }`}
                    >
                        <button
                            type='button'
                            className='sidebar-btn bg-transparent nav-link border-0'
                            style={{color: 'white'}}
                            onClick={() => handleButtonClick('drafts')}
                        >
                            <i
                                className='bi bi-send'
                                style={{rotate: '45deg'}}
                            ></i>
                            <div className='sidebar-btn-label'>
                                Drafts & sent
                            </div>
                        </button>
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
                    activeButton={activeButton}
                    handleButtonClick={handleButtonClick}
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
                    activeButton={activeButton}
                    handleButtonClick={handleButtonClick}
                />
            </div>
        </div>
    );
}
