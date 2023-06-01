import Homepage from './pages/Homepage';
import { useState } from 'react';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);

  return (
    <Homepage
      loggedUser={loggedUser}
      setLoggedUser={setLoggedUser}
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn}
    />
  );
}

export default App;
