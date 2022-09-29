import Footer from "./components/Footer";
import Header from "./components/Header/Header";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import { Container } from "@mui/system";
import { createTheme, ThemeProvider } from "@mui/material";
import { Provider } from "react-redux";
import store from "./store";
import CartScreen from "./screens/CartScreen";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F1582C",
    },
  },
});

function App() {
  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <Header />
            <Container sx={{ minHeight: "80vh" }}>
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/product/:id" element={<ProductScreen />} />
                <Route path="/cart" element={<CartScreen />} />
                <Route path="/cart/:id" element={<CartScreen />} />
              </Routes>
            </Container>
            <Footer />
          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
