import React from "react";
import { Box, Container, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Image from "next/image";
import Link from "next/link";

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
          <Link
            href="https://github.com/oakdisc/gitclone-generator"
            aria-label="Star this project on GitHub"
          >
            <Image
              src="https://img.shields.io/github/stars/oakdisc/gitclone-generator.svg"
              alt="GitHub Repo stars"
              width={88}
              height={20}
            />
          </Link>
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Made with{" "}
          <FavoriteIcon style={{ height: "1rem" }} aria-label="love" /> by{" "}
          <Link href={"https://github.com/oakdisc"}>oakdisc</Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Footer;
