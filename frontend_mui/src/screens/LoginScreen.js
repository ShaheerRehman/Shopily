import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import Layout from "../Layout";
import Typography from "@mui/material/Typography";
import { Box, Button, Grid, TextField } from "@mui/material";
import { login } from "../redux/reducers/ducks/UserDuck";
import { ToastContainer } from "react-toastify";

function Login() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loading, isAuthenticated } = useSelector((state) => state.User);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submit = () => {
    dispatch(login({ email: formData.email, password: formData.password }));
  };
  if (isAuthenticated) return <Navigate to="/"></Navigate>;
  return (
    <Layout title="Login" content="login">
      <ToastContainer />
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" color="initial">
            Login
          </Typography>
        </Grid>
        <Box width="100%" />
        <Grid item xs={12} sm={6}>
          <TextField
            id="email"
            name="email"
            label="Email Address"
            variant="standard"
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Box width="100%" />
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-password-input"
            name="password"
            label="Password"
            type="password"
            variant="standard"
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Box width="100%" />
        <Grid item xs={12} sm={6}>
          <Button disabled={loading} variant="contained" onClick={submit}>
            Login
          </Button>
        </Grid>
        <Box width="100%" />
        <Box width="100%" />
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" color="initial">
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>
        </Grid>
        <Box width="100%" />
      </Grid>
    </Layout>
  );
}

export default Login;
