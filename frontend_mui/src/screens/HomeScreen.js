import Product from "../components/Product";
import { useEffect } from "react";
import Typography from "@mui/material/Typography";
import { Alert, CircularProgress, Grid, LinearProgress } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProducts } from "../redux/reducers/ducks/ProductListDuck";
import { useSelector } from "react-redux";

function HomeScreen() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => ({
    products: state.productList.products,
    loading: state.productList.loading,
    error: state.productList.error,
  }));
  useEffect(() => {
    dispatch(fetchProducts());
    // async function fetchProducts() {
    //   const { data } = await axios.get("/api/products/");
    //   setProducts(data);
    // }
    // fetchProducts();
  }, [dispatch]);
  loading ? console.log("loading") : console.log("loaded");
  error && console.log(error);
  return (
    <>
      <Typography variant="h4" gutterBottom color="initial">
        Latest Products
      </Typography>

      {loading ? (
        <LinearProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={2}>
          {console.log(products)}
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <Link
                to={`/product/${product._id}`}
                style={{ textDecoration: "none" }}
              >
                <Product product={product} />
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default HomeScreen;
