// style
import "../style/dashboard/SMDropdown.scss";

export default function SMDropdown(props) {
  let { options, fnName, name, value, isRequired } = props;
  return (
    <select
      value={value && value}
      className="smDropDown"
      onChange={fnName}
      name={name}
      required={isRequired}
    >
      <option value="">--Please choose an option--</option>
      {options &&
        options.length > 0 &&
        options.map((value, index) => {
          return (
            <option value={value} key={index}>
              {value}
            </option>
          );
        })}
    </select>
  );
}
