import { Squash as Hamburger } from "hamburger-react";
import { useState, useRef } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { Outlet, Link, useNavigate } from "react-router-dom";

function SmallNavBar(props) {
  //const [isOpen, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const anchorRef = useRef(null);

  function handleClose() {
    setAnchorEl(false);
  }

  const navigate = useNavigate();

  return (
    <div
      ref={anchorRef}
      style={{
        position: "absolute",
        top: "30px",
        right: "40px",
      }}
    >
      <IconButton
        onClick={() => {
          // Toggle anchorEl
          setAnchorEl(!anchorEl);
        }}
      >
        <Hamburger toggled={anchorEl} size={48} distance="sm" color="#FB6F92" />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorRef.current}
        open={anchorEl}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: "20ch",
          },
        }}
      >
        <MenuItem
          key="Home"
          onClick={() => {
            navigate("/");
            handleClose();
          }}
        >
          Home
        </MenuItem>

        <MenuItem
          key="Services"
          onClick={() => {
            navigate("/services");
            handleClose();
          }}
        >
          Services
        </MenuItem>
        <MenuItem
          key="About"
          onClick={() => {
            navigate("/about");
            handleClose();
          }}
        >
          About
        </MenuItem>
      </Menu>
    </div>
  );
}

export default SmallNavBar;
