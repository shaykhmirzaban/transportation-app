import "../style/basic/SMLabel.scss";

export default function SMLabel1(props) {
  let { name } = props;
  return (
    <div className="label1">
      <h1>{name && name}</h1>
    </div>
  );
}
