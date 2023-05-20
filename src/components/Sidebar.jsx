function Sidebar() {
  return (
    <>
      <div className="sidebar-container">
        <div className="sidebar-header sidebar-item nav-item nav nav-tabs">
          Avion School
        </div>
        <ul className="sidebar-item nav nav-tabs">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Threads
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Later
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Mentions & reactions
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Drafts & sent
            </a>
          </li>
        </ul>
        <ul className="sidebar-item nav nav-tabs flex-grow-1">
          <li className="nav-item">
            <a className="nav-link" href="#">
              Channels
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Direct Messages
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
