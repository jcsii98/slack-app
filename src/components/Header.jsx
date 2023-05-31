import Logo from '../assets/slack.png';
function Header(props) {
  const { setIsLoggedIn, isLoggedIn } = props;
  const buttonClick = () => {
    setIsLoggedIn(false);
    sessionStorage.clear();
  };
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center p-3" style={{maxHeight: "5%"}}>
      <div style={{maxWidth: "5%"}}>
        <img src={Logo} style={{backgroundSize: "contain",width: "100%"}}/>
      </div>
      {isLoggedIn && (
        <>
          <form className="container-form"></form>
          <div className="" style={{width: "8%"}}>
            <button
              className='bg-transparent'
              style={{color: "white"}}
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