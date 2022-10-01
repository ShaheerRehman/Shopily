import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchItemToAdd,
  removeFromCart,
} from "../redux/reducers/ducks/CartDuck";
import {
  Alert,
  Grid,
  CardMedia,
  Button,
  Card,
  CardContent,
  Box,
  Divider,
  CardActions,
} from "@mui/material";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import BasicMenuRedux from "../components/MenuRedux";
import { useNavigate } from "react-router-dom";

function CartScreen() {
  const [searchParams] = useSearchParams();
  const params = useParams();
  const productId = Number(params.id);
  const qty = Number(searchParams.get("qty"));
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.Cart.cartItems);
  useEffect(() => {
    if (productId) {
      dispatch(fetchItemToAdd({ id: productId, qty }));
    }
  }, [dispatch, productId, qty]);

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <>
      <Typography variant="h4" gutterBottom color="initial">
        Shopping Cart
      </Typography>
      {cart.length === 0 ? (
        <Alert severity="warning">
          No items in cart! Go to <Link to="/"> hompage </Link>
        </Alert>
      ) : (
        <Grid container mt={4}>
          <Grid item xs={12} md={8}>
            {cart.map((item) => (
              <Grid key={item.product} container spacing={2} mb={1}>
                <Grid item md={2} sx={{ display: { xs: "none", md: "block" } }}>
                  <CardMedia
                    component="img"
                    alt={item.name}
                    image={item.image}
                  />
                </Grid>
                <Grid item xs={6} md={4}>
                  <Typography
                    variant="body2"
                    color="initial"
                    component={Link}
                    to={`/product/${item.product}`}
                  >
                    {item.name}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="body2" color="text.secondary">
                    ${item.price}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  {item.countInStock > 0 && (
                    <BasicMenuRedux
                      id={item.product}
                      qty={item.qty}
                      countInStock={item.countInStock}
                    />
                  )}
                </Grid>
                <Grid item xs={2}>
                  <Button
                    color="error"
                    onClick={() => {
                      dispatch(removeFromCart(item.product));
                    }}
                  >
                    <DeleteForeverRoundedIcon />
                  </Button>
                </Grid>
              </Grid>
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <Card variant="outlined">
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" color="initial">
                    Total items:
                  </Typography>
                  <Typography variant="body1" color="initial">
                    {cart.reduce((acc, item) => acc + item.qty, 0)} items
                  </Typography>
                </Box>
              </CardContent>
              <Divider />

              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" color="initial">
                    Total amount:
                  </Typography>
                  <Typography variant="body1" color="initial">
                    $
                    {cart
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}
                  </Typography>
                </Box>
              </CardContent>
              <Divider />

              <CardActions>
                <Button
                  disabled={cart.length === 0}
                  variant="contained"
                  sx={{ minWidth: "100%" }}
                  onClick={checkoutHandler}
                >
                  Checkout
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default CartScreen;
