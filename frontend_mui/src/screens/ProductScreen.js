import Rating from "../components/Rating";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct } from "../redux/reducers/ducks/ProductDuck";
import Typography from "@mui/material/Typography";
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  LinearProgress,
} from "@mui/material";
import { Box } from "@mui/system";
import BasicMenu from "../components/Menu";
import { useNavigate } from "react-router-dom";

function ProductScreen() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { product, loading, error } = useSelector((state) => ({
    product: state.product.product,
    loading: state.product.loading,
    error: state.product.error,
  }));
  if (!product) {
    dispatch(fetchProduct(params.id));
  }
  const [qty, setQty] = useState(1);

  const handleCartClick = () => {
    navigate(`/cart/${params.id}?qty=${qty}`);
  };

  useEffect(() => {
    dispatch(fetchProduct(params.id));
  }, [params.id, dispatch]);
  return (
    <>
      {loading ? (
        <LinearProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={4} lg={6}>
            <img src={product.image} alt="pic" style={{ width: "100%" }} />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Typography variant="h5" color="initial">
              {product.name}
            </Typography>
            <Divider sx={{ mt: 2, mb: 1 }} />
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
            <Divider sx={{ my: 1 }} />
            <Typography variant="body1" color="initial">
              Price: ${product.price}
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="body1" color="initial">
              Description: {product.description}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body1" color="initial">
                    Price:
                  </Typography>
                  <Typography variant="body1" color="initial">
                    ${product.price}
                  </Typography>
                </Box>
              </CardContent>
              <Divider />

              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body1" color="initial">
                    Status:
                  </Typography>
                  <Typography variant="body1" color="initial">
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Typography>
                </Box>
              </CardContent>
              <Divider />
              {product.countInStock > 0 && (
                <Box>
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body1" color="initial">
                        Quantity:
                      </Typography>
                      <BasicMenu
                        qty={qty}
                        setQty={setQty}
                        countInStock={product.countInStock}
                      />
                    </Box>
                  </CardContent>
                  <Divider />
                </Box>
              )}

              <CardActions>
                <Button
                  disabled={product.countInStock === 0}
                  variant="contained"
                  sx={{ minWidth: "100%" }}
                  onClick={handleCartClick}
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
}

export default ProductScreen;
