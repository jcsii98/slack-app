import Homepage from './pages/Homepage';
import { useState } from 'react';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log("isLoggedIn[App]: " + isLoggedIn);
  return <Homepage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />;
}

export default App;
