function BookButton(props) {
  return (
    <button
      className="buttonContainer"
      style={{
        height: "70px",
        width: "190px",
        borderRadius: "10px",
        backgroundColor: props.type == "primary" ? "#ff8fab" : "#FFE5EC",
        fontWeight: "bold",
        border: 0,
        fontSize: "20px",
      }}
    >
      Book Now
    </button>
  );
}

export default BookButton;
