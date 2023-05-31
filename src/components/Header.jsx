import Logo from '../assets/slack.png';
function Header(props) {
  const { setIsLoggedIn, isLoggedIn,loggedUser } = props;
  const buttonClick = () => {
    setIsLoggedIn(false);
    sessionStorage.clear();
  };
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center" style={{maxHeight: "5%", padding: "1em 0 1em 1em"}}>
      <div style={{maxWidth: "5%"}}>
        <img src={Logo} style={{backgroundSize: "contain",width: "100%"}}/>
      </div>
      {isLoggedIn && (
        <>
          <form className="container-form"></form>
          <div className='d-flex justify-content-center align-items-center gap-2'>
            <i className="bi bi-person-circle" style={{fontSize: "1.7rem", color: "white"}}/>
            <div style={{color: "white"}}>{loggedUser.email}</div>
          </div>
          <div className="d-flex just" style={{width: "8rem", marginLeft: "auto"}}>
            <button
              className='container-fluid bg-transparent'
              style={{color: "white", border: "none", outline: "none"}}
              type="button"
              onClick={buttonClick}
            >
              Log out
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Header;