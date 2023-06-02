function CredentialsInput(props) {
  const { type, name, label, value, onChange } = props;
  return (
    <div className="d-flex flex-column gap-2">
      <label htmlFor={name}>{label}</label>
      <input
        className="container-fluid"
        style={{borderTop: "none", borderLeft: "none", borderRight: "none", borderBottom: '1px solid black'}}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default CredentialsInput;
