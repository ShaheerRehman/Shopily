import { Container } from "@mui/system";
import { Helmet } from "react-helmet";

const Layout = ({ title, content, children }) => (
  <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={content} />
    </Helmet>
    <Container sx={{ minHeight: "80vh" }}>{children}</Container>
  </>
);

export default Layout;
