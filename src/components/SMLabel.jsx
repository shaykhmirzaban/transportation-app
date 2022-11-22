import "../style/basic/SMLabel.scss";

export default function SMLabel(props) {
  let { name } = props;
  return (
    <div className="label">
      <h1>{name && name}</h1>
    </div>
  );
}
