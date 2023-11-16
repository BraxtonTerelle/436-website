import "../styles/BookButton.css";

function BookButton(props) {
  return (
    <button
      onClick={props.onClick}
      className="buttonContainer"
      style={{
        backgroundColor: props.type == "primary" ? "#ff8fab" : "#FFE5EC",
      }}
    >
      {props.label}
    </button>
  );
}

export default BookButton;
