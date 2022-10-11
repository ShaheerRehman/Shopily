import Footer from "./components/Footer";
import Header from "./components/Header/Header";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import { createTheme, ThemeProvider } from "@mui/material";
import CartScreen from "./screens/CartScreen";
import Register from "./screens/RegisterScreen";
import Login from "./screens/LoginScreen";
import { checkAuth } from "./redux/reducers/ducks/UserDuck";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F1582C",
    },
  },
});

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
  }, []);
  return (
    <>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Header />
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/product/:id" element={<ProductScreen />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/cart/:id" element={<CartScreen />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
