import Sidebar from '../components/Sidebar';
import DashboardCenter from '../components/DashboardCenter';

function DashPage(props) {
  const { isLoggedIn, setIsLoggedIn, email, setEmail } = props;

  const { config,setConfig } = props
  const { loggedUser } = props

  return (
    <>
      <div className="dashboard-center-container">
        <Sidebar loggedUser={loggedUser} config={config} setConfig={setConfig}/>
        <DashboardCenter />
      </div>
    </>
  );
}

export default DashPage;
