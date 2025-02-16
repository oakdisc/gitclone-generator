import React from "react";
import { Box, Container, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          textAlign: "center",
          paddingTop: "50px",
        }}
      >
        <Typography variant="body2" color="textSecondary">
          <Image
            src="https://img.shields.io/github/stars/oakdisc/gitclone-generator.svg"
            alt="GitHub Repo stars"
            width={88}
            height={20}
          />
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Made with love <FavoriteIcon style={{ height: "1rem" }} /> by oakdisc
        </Typography>
      </Box>
    </Container>
  );
};

export default Footer;
