function CredentialsInput(props) {
  const { type, name, label, value, onChange } = props;
  return (
    <>
      <label htmlFor={name}>{label}</label>
      <input
        className="main-input"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

export default CredentialsInput;
