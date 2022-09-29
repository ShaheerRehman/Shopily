import { Typography } from "@mui/material";
import React from "react";

function Footer() {
  return (
    <Typography
      sx={{ display: "flex", justifyContent: "center", my: 2 }}
      variant="body1"
      color="initial"
    >
      Copyright &copy; Shopily
    </Typography>
  );
}

export default Footer;
