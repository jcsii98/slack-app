import Logo from '../assets/slack.png';
function Header(props) {
  const { setIsLoggedIn, isLoggedIn } = props;
  const buttonClick = () => {
    setIsLoggedIn(false);
  };
  return (
    <>
      <div class="navbar-container">
        <nav className="navbar bg-body-tertiary">
          <img className="header-logo" src={Logo} />
          {isLoggedIn && (
            <>
              <form className="container-fluid">
                <div className="input-group">
                  <span className="input-group-text" id="basic-addon1">
                    @
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </div>
              </form>
              <button
                type="button"
                className="btn btn-primary"
                onClick={buttonClick}
              >
                Log out
              </button>
            </>
          )}
        </nav>
      </div>
    </>
  );
}

export default Header;
