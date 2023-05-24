import Logo from '../assets/slack.png';
function Header(props) {
  const { setIsLoggedIn, isLoggedIn } = props;
  const buttonClick = () => {
    setIsLoggedIn(false);
  };
  return (
    <>
      <div className="navbar-container">
        <nav className="navbar bg-body-tertiary">
          <img className="header-logo" src={Logo} />
          {isLoggedIn && (
            <>
              <form className="container-form">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </form>
              <div className="header-button">
                {' '}
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={buttonClick}
                >
                  Log out
                </button>
              </div>
            </>
          )}
        </nav>
      </div>
    </>
  );
}

export default Header;
