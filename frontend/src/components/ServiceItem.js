import "../styles/ServiceItem.css";
import Checkbox from "@mui/material/Checkbox";


function ServiceItem(props) {
  //const [selected, setSelected] = useState(false);
  // This is for the popupContainer when a customer is selecting the types of services they're
  // adding to the appointment shopping card
  if (props.type === "checkbox") {
    return (
      <div className="hairItemCheckbox" onClick={props.onChange}>
        <div className="hairItemChild">
          <h2 style={{ margin: "0", padding: "0" }}>
            {props.title} - {props.price}
          </h2>
          <p style={{ margin: "0", padding: "0" }}>
            Estimated: {props.timeEstimate}
          </p>
        </div>
        <div className="checkboxContainer">
          <Checkbox
            checked={props.checked}
            onChange={props.onChange}
            size="large"
            sx={{
              color: "#FB6F92",
              "&.Mui-checked": {
                color: "#FB6F92",
              },
            }}
          />
        </div>
      </div>
    );
  } else {
    // This is for the services page where a customer is just browsing
    return (
      <div className="hairItem" onClick={props.onClick}>
        <h2>
          {props.title} - {props.price}
        </h2>
        <p>Estimated: {props.timeEstimate}</p>
        <div className="bookNowContainer">
          <h3>Book Now</h3>
        </div>
      </div>
    );
  }
}

export default ServiceItem;
