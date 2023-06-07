import CredentialsPage from './CredentialsPage.jsx';
import Header from '../components/Header.jsx';
import {useState} from 'react';
import DashPage from './DashPage.jsx';
import slack from '../assets/slack.png';
import team from '../assets/team.png';
import Typewriter from 'typewriter-effect';

function Homepage(props) {
    const {
        isLoggedIn,
        setIsLoggedIn,
        loggedUser,
        config,
        setConfig,
        setLoggedUser,
    } = props;
    const [email, setEmail] = useState('');

    return (
        <div
            className='padding-0 container-fluid d-flex justify-content-cent align-items-center h-100'
            style={{position: 'fixed'}}
        >
            {isLoggedIn ? (
                <div className='container-fluid d-flex flex-column h-100 p-0'>
                    <Header
                        isLoggedIn={isLoggedIn}
                        setIsLoggedIn={setIsLoggedIn}
                        loggedUser={loggedUser}
                    />
                    <DashPage
                        email={email}
                        setEmail={setEmail}
                        isLoggedIn={isLoggedIn}
                        setIsLoggedIn={setIsLoggedIn}
                        config={config}
                        setConfig={setConfig}
                        loggedUser={loggedUser}
                    />
                </div>
            ) : (
                <div
                    className='container-fluid d-flex justify-content-center align-items-center h-100'
                    style={{
                        zIndex: '1',
                        backgroundImage: `url("${team}"), url("${slack}")`,
                        backgroundPosition: '25% 25%, 50% 3%',
                        backgroundSize: '500px, 200px',
                        backgroundRepeat: 'no-repeat no-repeat',
                    }}
                >
                    <div
                        className='d-flex flex-column gap-2'
                        style={{
                            width: '100rem',
                            fontSize: '1rem',
                            color: 'white',
                            position: 'absolute',
                            top: '61%',
                            left: '10%',
                        }}
                    >
                        <div
                            className='d-flex flex-column'
                            style={{fontSize: '3rem'}}
                        >
                            <span className=''>Make work life&nbsp;</span>
                            <Typewriter
                                onInit={(typewriter) => {
                                    typewriter
                                        .typeString('simpler')
                                        .pauseFor(500)
                                        .deleteAll()
                                        .typeString('more pleasant')
                                        .pauseFor(500)
                                        .deleteAll()
                                        .typeString('and more productive.')
                                        .pauseFor(500)
                                        .deleteAll()
                                        .typeString(
                                            'simpler, more pleasant, and more productive.'
                                        )
                                        .start();
                                }}
                            />
                        </div>
                        <p style={{maxWidth: '50%', fontSize: '1.2rem'}}>
                            Slack is the productivity platform that empowers
                            everyone with no-code automation and AI, makes
                            search and knowledge sharing seamless, and keeps
                            teams connected and engaged. Around the world, Slack
                            is the platform companies trust and people love to
                            use.
                        </p>
                    </div>
                    <CredentialsPage
                        email={email}
                        setEmail={setEmail}
                        isLoggedIn={isLoggedIn}
                        setIsLoggedIn={setIsLoggedIn}
                        config={config}
                        setConfig={setConfig}
                        loggedUser={loggedUser}
                        setLoggedUser={setLoggedUser}
                    />
                </div>
            )}
        </div>
    );
}

export default Homepage;
