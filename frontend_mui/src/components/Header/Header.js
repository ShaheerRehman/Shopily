import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import HowToRegRoundedIcon from "@mui/icons-material/HowToRegRounded";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/reducers/ducks/UserDuck";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar() {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.Cart.cartItems);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const { isAuthenticated, user } = useSelector((state) => state.User);
  const menuId = "primary-search-account-menu";
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    setMobileMoreAnchorEl(null);
  };
  const authLinks = (
    <>
      <Divider orientation="vertical" flexItem />
      <IconButton
        size="small"
        aria-label="account of current user"
        aria-haspopup="true"
        color="inherit"
      >
        <AccountCircle />
        {isAuthenticated && user !== null ? user.first_name : null}
      </IconButton>
      <Divider orientation="vertical" flexItem />

      <IconButton
        size="small"
        onClick={handleLogout}
        edge="end"
        aria-label="logout"
        aria-haspopup="true"
        color="inherit"
      >
        <LogoutRoundedIcon />
      </IconButton>
    </>
  );
  const guestLinks = (
    <>
      <Divider orientation="vertical" flexItem />

      <IconButton
        onClick={handleMobileMenuClose}
        component={Link}
        to="/register"
        size="small"
        aria-label="account of current user"
        aria-haspopup="true"
        color="inherit"
      >
        <HowToRegRoundedIcon />
        Register
      </IconButton>
      <Divider orientation="vertical" flexItem />

      <IconButton
        size="small"
        component={Link}
        to="/login"
        edge="end"
        aria-label="logout"
        aria-haspopup="true"
        color="inherit"
      >
        <LoginRoundedIcon />
      </IconButton>
    </>
  );
  const authLinksMobile = (
    <>
      <MenuItem onClick={handleMobileMenuClose} component={Link} to="#">
        <IconButton
          size="small"
          aria-label="account of current user"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        {isAuthenticated && user !== null ? user.first_name : null}
      </MenuItem>
      <MenuItem
        onClick={(handleMobileMenuClose, handleLogout)}
        component={Link}
        to="#"
      >
        <IconButton
          size="small"
          aria-label="logout"
          aria-haspopup="true"
          color="inherit"
        >
          <LogoutRoundedIcon />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </>
  );
  const guestLinksMobile = (
    <>
      <MenuItem onClick={handleMobileMenuClose} component={Link} to="/register">
        <IconButton
          size="small"
          aria-label="account of current user"
          aria-haspopup="true"
          color="inherit"
        >
          <HowToRegRoundedIcon />
        </IconButton>
        <p>Register</p>
      </MenuItem>

      <MenuItem onClick={handleMobileMenuClose} component={Link} to="/login">
        <IconButton
          size="small"
          aria-label="logout"
          aria-haspopup="true"
          color="inherit"
        >
          <LoginRoundedIcon />
        </IconButton>
        <p>Login</p>
      </MenuItem>
    </>
  );
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMobileMenuClose} component={Link} to="/cart">
        <IconButton
          size="large"
          aria-label="show 3 items in cart"
          color="inherit"
        >
          <Badge badgeContent={cart.length} color="error">
            <ShoppingCartRoundedIcon />
          </Badge>
        </IconButton>
        <p>Cart</p>
      </MenuItem>
      {isAuthenticated ? authLinksMobile : guestLinksMobile}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1, mb: 10 }}>
      <AppBar>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            to="/"
            component={Link}
            sx={{
              display: { xs: "none", sm: "block" },
              color: "white",
              textDecoration: "none",
            }}
          >
            Shopily
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              onClick={handleMobileMenuClose}
              component={Link}
              to="/cart"
              size="large"
              aria-label="show 3 items in cart"
              color="inherit"
            >
              <Badge badgeContent={cart.length} color="error">
                <ShoppingCartRoundedIcon />
              </Badge>
            </IconButton>
            {isAuthenticated ? authLinks : guestLinks}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
