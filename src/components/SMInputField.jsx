import "../style/component/SMInputField.scss";

export default function SMInputField(props) {
  let {
    placeholder,
    id,
    fnName,
    style,
    name,
    isRequired,
    type,
    value,
  } = props;
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      onChange={fnName}
      required={isRequired && isRequired}
      style={style}
      id={id && id}
      value={value && value}
    />
  );
}
