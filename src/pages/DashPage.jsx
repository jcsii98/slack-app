function DashPage(props) {
  const { isLoggedIn, setIsLoggedIn, email, setEmail } = props;
  return (
    <>
      <div>Welcome, {email}</div>
    </>
  );
}

export default DashPage;
