import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import Rating from "./Rating";

export default function Product({ product }) {
  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardMedia component="img" alt="pic" height="250" image={product.image} />
      <CardContent>
        <Typography gutterBottom variant="h6">
          {_.truncate(product.name, { length: 30 })}
        </Typography>
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        <Typography variant="h6" color="initial">
          ${product.price}
        </Typography>
      </CardContent>
    </Card>
  );
}
