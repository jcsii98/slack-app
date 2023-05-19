import Sidebar from '../components/Sidebar';

function DashPage(props) {
  const { isLoggedIn, setIsLoggedIn, email, setEmail } = props;
  return (
    <>
      <Sidebar />
    </>
  );
}

export default DashPage;
