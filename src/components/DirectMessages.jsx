import {useState, useEffect} from 'react';
import List from './List';
import api from '../api.js';

export default function DirectMessages(props) {
    const {
        loggedUser,
        contacts,
        messageSuccess,
        setConversation,
        currentMessagedId,
        setCurrentMessagedId,
        setReceiverData,
        receiverClass,
        setReceiverClass,
        setAlert,
        activeButton,
        handleButtonEffect,
    } = props;
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = () => {
            setData(() => {
                const localUserContact = Object.entries(
                    contacts[loggedUser.id]
                );
                return localUserContact;
            });
        };
        getData();
        if (currentMessagedId && receiverClass !== 'Channel')
            userClick(currentMessagedId);
    }, [messageSuccess]);

    const userClick = async (id) => {
        setAlert({status: '', message: ''});
        console.log(id);
        setCurrentMessagedId(id);
        const response = await api.get(
            `/messages?receiver_id=${id}&receiver_class=User`
        );
        setReceiverClass('User');
        console.log(response);
        const userReceiver =
            response.data.data[0].receiver.id === loggedUser.id
                ? response.data.data[0].sender
                : response.data.data[0].receiver;
        console.log(userReceiver);
        setReceiverData({id: userReceiver.id, name: userReceiver.email});
        setConversation(Array.from(response.data.data));
    };

    return (
        <div className='container-fluid p-0 nav-tabs'>
            {data && (
                <List
                    handleClick={userClick}
                    setConversation={setConversation}
                    title={'Direct Messages'}
                    classType={'d-none'}
                    data={data}
                    activeButton={activeButton}
                    handleButtonEffect={handleButtonEffect}
                />
            )}
        </div>
    );
}
