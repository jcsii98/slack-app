import Sidebar from '../components/Sidebar';
import DashboardCenter from '../components/DashboardCenter';

function DashPage(props) {
  const { isLoggedIn, setIsLoggedIn, email, setEmail } = props;
  return (
    <>
      <div className="dashboard-center-container">
        <Sidebar />
        <DashboardCenter />
      </div>
    </>
  );
}

export default DashPage;
