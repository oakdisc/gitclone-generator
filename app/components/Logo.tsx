import React from "react";
import { Box, Typography } from "@mui/material";

const Logo: React.FC = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", padding: "16px" }}>
      <Typography variant="h5" component="div" sx={{ fontWeight: "bold" }}>
        Git Clone Generator
      </Typography>
    </Box>
  );
};

export default Logo;
