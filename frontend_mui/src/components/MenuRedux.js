import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import { useDispatch } from "react-redux";
import { fetchItemToAdd } from "../redux/reducers/ducks/CartDuck";

export default function BasicMenuRedux({ id, qty, countInStock }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        aria-label="more"
        id="long-button"
        aria-controls={open ? "set-quantity" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        {qty}
        <KeyboardArrowDownRoundedIcon />
      </Button>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "set-quantity",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 220,
            width: "20ch",
          },
        }}
      >
        {[...Array(countInStock).keys()].map((x) => (
          <MenuItem
            key={x + 1}
            onClick={() => {
              setAnchorEl(null);
              dispatch(fetchItemToAdd({ id, qty: x + 1 }));
            }}
          >
            {x + 1}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
