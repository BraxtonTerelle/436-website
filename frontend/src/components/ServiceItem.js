import "../styles/ServiceItem.css";

function ServiceItem(props) {
  var addonText = "None";
  if (props.addons?.length > 0) {
    addonText = "";
    for (const index in props.addons) {
      addonText += props.addons[index];
    }
  }
  return (
    <div className="hairItem">
      <h2 style={{ margin: "0", padding: "0" }}>
        {props.title} - {props.price}
      </h2>
      <p style={{ margin: "0", padding: "0" }}>
        Estimated: {props.timeEstimate}
      </p>
      <div style={{ textAlign: "end" }}>Add-ons: {addonText}</div>
    </div>
  );
}

export default ServiceItem;
