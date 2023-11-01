import "../styles/ServiceItem.css";

function ServiceItem(props) {
  return (
    <div className="hairItem">
      <h2 style={{ margin: "0", padding: "0" }}>
        {props.title} - {props.price}
      </h2>
      <p style={{ margin: "0", padding: "0" }}>
        Estimated: {props.timeEstimate}
      </p>
    </div>
  );
}

export default ServiceItem;
