import React from "react";
import muiStarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import muiStarHalfRoundedIcon from "@mui/icons-material/StarHalfRounded";
import muiStarRoundedIcon from "@mui/icons-material/StarRounded";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/system";
import styled from "@emotion/styled";

const StarBorderRoundedIcon = styled(muiStarBorderRoundedIcon)({
  fontSize: 24,
});
const StarRoundedIcon = styled(muiStarRoundedIcon)({
  fontSize: 24,
});
const StarHalfRoundedIcon = styled(muiStarHalfRoundedIcon)({
  fontSize: 24,
});

function Rating({ value, text }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
      }}
    >
      <Typography variant="body2" sx={{ color: "primary.main" }}>
        {value >= 1 ? (
          <StarRoundedIcon />
        ) : value >= 0.5 ? (
          <StarHalfRoundedIcon />
        ) : (
          <StarBorderRoundedIcon />
        )}
        {value >= 2 ? (
          <StarRoundedIcon />
        ) : value >= 1.5 ? (
          <StarHalfRoundedIcon />
        ) : (
          <StarBorderRoundedIcon />
        )}
        {value >= 3 ? (
          <StarRoundedIcon />
        ) : value >= 2.5 ? (
          <StarHalfRoundedIcon />
        ) : (
          <StarBorderRoundedIcon />
        )}
        {value >= 4 ? (
          <StarRoundedIcon />
        ) : value >= 3.5 ? (
          <StarHalfRoundedIcon />
        ) : (
          <StarBorderRoundedIcon />
        )}
        {value >= 5 ? (
          <StarRoundedIcon />
        ) : value >= 4.5 ? (
          <StarHalfRoundedIcon />
        ) : (
          <StarBorderRoundedIcon />
        )}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {" "}
        ({text && text})
      </Typography>
    </Box>
  );
}

export default Rating;
