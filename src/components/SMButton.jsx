// style
import "../style/component/SMButton.scss";
import SMLoading from "./SMLoading";

export default function SMButton(props) {
  let { fnName, value, style, isDisabled, icon, isLoading } = props;
  return (
    <>
      {isLoading ? (
        <button className="smButton">
          <SMLoading />
        </button>
      ) : (
        <button
          className="smButton"
          onClick={fnName}
          style={style}
          disabled={isDisabled}
        >
          {value} {icon && icon}
        </button>
      )}
    </>
  );
}
