import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import Layout from "../Layout";
import Typography from "@mui/material/Typography";
import { Box, Button, Grid, TextField } from "@mui/material";
import { register } from "../redux/reducers/ducks/UserDuck";

function Register() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const { registered, loading } = useSelector((state) => state.User);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submit = () => {
    dispatch(
      register({
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
      })
    );
  };
  if (registered) return <Navigate to="/login" />;
  return (
    <Layout title="Register" content="register">
      <Grid container spacing={3} justifyContent="center" alignItems="center">
        <Grid item xs={12} sm={6}>
          <Typography variant="h4" color="initial">
            Register
          </Typography>
        </Grid>
        <Box width="100%" />
        <Grid item xs={12} sm={6}>
          <TextField
            id="name"
            name="first_name"
            label="First Name"
            variant="standard"
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Box width="100%" />
        <Grid item xs={12} sm={6}>
          <TextField
            id="name"
            name="last_name"
            label="Last Name"
            variant="standard"
            onChange={handleChange}
            fullWidth
          />
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
            label="Password"
            type="password"
            variant="standard"
            fullWidth
          />
        </Grid>
        <Box width="100%" />
        <Grid item xs={12} sm={6}>
          <TextField
            id="outlined-password-input"
            name="password"
            label="Confirm Password"
            type="password"
            variant="standard"
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Box width="100%" />
        <Grid item xs={12} sm={6}>
          <Button disabled={loading} variant="contained" onClick={submit}>
            Register
          </Button>
        </Grid>
        <Box width="100%" />
        <Box width="100%" />
        <Grid item xs={12} sm={6}>
          <Typography variant="body2" color="initial">
            Have an account? <Link to="/login">Login</Link>
          </Typography>
        </Grid>
        <Box width="100%" />
      </Grid>
    </Layout>
  );
}

export default Register;
