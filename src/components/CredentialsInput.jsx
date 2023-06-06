function CredentialsInput(props) {
  const { type, name, label, value, onChange } = props;
  return (
    <div className="form-floating w-100 p-0">
      <input
        className="form-control"
        style={{
          fontSize: "1.5rem",
          borderTop: 'none',
          borderLeft: 'none',
          borderRight: 'none',
          borderBottom: '1px solid black',
        }}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
}

export default CredentialsInput;
