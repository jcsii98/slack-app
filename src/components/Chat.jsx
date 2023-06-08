import DirectMessagesHeader from './DirectMessagesHeader';
import Message from './Message';
import {useEffect, useRef, useState} from 'react';
import api from '../api.js';
import {Editor} from '@tinymce/tinymce-react';

function Chat(props) {
    const {
        conversation,
        client,
        loggedUser,
        setContacts,
        setMessageSuccess,
        currentMessagedId,
        setCurrentMessagedId,
        receiverData,
        setReceiverData,
        receiverClass,
        setReceiverClass,
        alert,
        setAlert,
    } = props;

  // message = receiver_id, receiver_class, body
  const [message, setMessage] = useState('');
  const isLoadingRef = useRef(false)
  const firstMountRef = useRef(true);
  const editorRef = useRef(null);

    useEffect(() => {
        const updateReceiver = async () => {
            try {
                const response = await api.get('/users');
                const users = response.data.data;
                const userData = users.find(
                    (user) => user.id === currentMessagedId
                );
                setReceiverData({id: userData.id, name: userData.email});
            } catch (error) {
                console.log(error);
                setAlert({status: 'error', message: error});
            }
        };
        if (!firstMountRef) {
            if (receiverClass !== null) {
                updateReceiver();
            }
        }
        firstMountRef.current = true;
    }, [currentMessagedId]);

  useEffect(() => {
    console.log("conversation updated!")
    setMessage('')
    console.log(message)
    if(editorRef.current) editorRef.current.setContent("");
  }, [conversation])

  const sendMessage = async () => {
    console.log(message)
    setMessageSuccess(false);
    try {
      const response = await api.post('/messages', {
        receiver_id: receiverData.id,
        receiver_class: receiverClass,
        body: editorRef.current.getContent()
      });
      if (response.statusText === 'OK') {
        setMessage('');
        if (receiverClass === 'User') {
          setContacts(() => {
            const localContacts = JSON.parse(localStorage.getItem('contacts'));

                        let updatedContact = localContacts[loggedUser.id];

                        if (!updatedContact[receiverData.id]) {
                            updatedContact = {
                                ...updatedContact,
                                [receiverData.id]: receiverData.email,
                            };
                        }
                        localContacts[loggedUser.id] = updatedContact;
                        localStorage.setItem(
                            'contacts',
                            JSON.stringify(localContacts)
                        );
                        return localContacts;
                    });
                }
                await setCurrentMessagedId(receiverData.id);
                setMessageSuccess(true);
            } else {
                console.log(error);
                setAlert({status: 'error', message: 'Failed to send message.'});
            }
        } catch (error) {
            console.log(error);
            setAlert({status: 'error', message: error});
        }
    };

  const onEnterPress = (event) => {
    if(event.keyCode == 13 && event.shiftKey == false) {
      event.preventDefault();
      handleChatSubmit();
    }
  }

  const handleChatSubmit = (event) => {
    event?.preventDefault();
    if(receiverData?.id === undefined) {
      setAlert({status: "error", message: "Invalid recipient!"})
      return
    }
    if(isLoadingRef.current.value === true) return
    sendMessage();
  };
  return (
    <div className="border container-fluid  p-2 bg-white d-flex flex-column gap-2"
      style={{minHeight: "88vh", maxHeight: "88vh", minWidth: "0"}}
    >
      {currentMessagedId ? null : (
        <DirectMessagesHeader
          isLoadingRef={isLoadingRef}
          setAlert={setAlert}
          client={client}
          setReceiverData={setReceiverData}
          receiverClass={receiverClass}
          setReceiverClass={setReceiverClass}
        />
      )}
      { currentMessagedId ? <></> :
          !alert.status ? <></> :
            alert.status === "error" ? 
              <div className="d-flex justify-content-center align-items-center gap-2 alert alert-danger p-2" role="alert" style={{fontWeight: "bold"}}>
                <i className="bi bi-x-circle-fill"></i>
                <div>
                  {alert.message}
                </div>
            ) : alert.status === 'success' ? (
                <div
                    className='d-flex justify-content-center align-items-center gap-2 alert alert-success d-flex align-items-center p-2'
                    role='alert'
                    style={{fontWeight: 'bold'}}
                >
                    <i className='bi bi-check-circle-fill'></i>
                    <div>{alert.message}</div>
                </div>
            ) : (
                <div
                    className='d-flex justify-content-center align-items-center gap-2 alert alert-primary d-flex align-items-center p-2'
                    role='alert'
                    style={{fontWeight: 'bold'}}
                >
                    <div
                        className='spinner-border text-primary'
                        role='status'
                    ></div>
                    <div>{alert.message}</div>
                </div>
                :
                <div className="d-flex justify-content-center align-items-center gap-2 alert alert-primary d-flex align-items-center p-2" role="alert" style={{fontWeight: "bold"}}>
                  <div className="spinner-border text-primary" role="status">
                  </div>
                  <div>
                    {alert.message}
                  </div>
                </div>  
      }
      <Message conversation={conversation} loggedUser={loggedUser} />
      <div
        className="container-fluid rounded-4 d-flex flex-column"
        style={{marginTop: '1.25%'}}
      >
        <Editor
          apiKey={import.meta.env.VITE_TINYMCE_KEY}
          onInit={(evt, editor) => editorRef.current = editor}
          init={{
            value: {message},
            placeholder: "Type your message here...",
            statusbar: false,
            branding: false,
            menubar: false,
            min_height: 150,
            max_height: 500,
            width: "100%",
            max_width: "100%",
            autoresize_overflow_padding: 5,
            autoresize_bottom_margin: 5,
            plugins: `powerpaste a11ychecker tinymcespellchecker linkchecker wordcount table advtable editimage autosave advlist anchor advcode image link lists media mediaembed searchreplace visualblocks emoticons autoresize`,
            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          }}
          onKeyDown={onEnterPress}
        />
        <div className="d-flex justify-content-end px-3">
          <i
            className="bi bi-send-fill"
            style={{ rotate: '45deg', position: "absolute", bottom: "1.5%", zIndex: "2" }}
            onClick={handleChatSubmit}
          ></i>
        </div>
      </div>
    </div>
  );
}

export default Chat;
