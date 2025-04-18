"use client";
import { useState, useEffect } from "react";
import {
  Container,
  Button,
  Typography,
  TextField,
  Select,
  MenuItem,
  Box,
  CircularProgress,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { LOCAL_STORAGE_KEYS, CLONE_METHODS } from "../utils/constants";

export default function Welcome() {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [sshProfileName, setSshProfileName] = useState("git@github.com");
  const [userEmail, setUserEmail] = useState("");
  const [userIdError, setUserIdError] = useState("");
  const [userEmailError, setUserEmailError] = useState("");
  const [cloneMethod, setCloneMethod] = useState(CLONE_METHODS.SSH);
  const router = useRouter();
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    // Retrieve values from localStorage
    const storedUserId = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ID);
    const storedUserName = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_NAME);
    const storedSshProfileName = localStorage.getItem(
      LOCAL_STORAGE_KEYS.SSH_PROFILE_NAME
    );
    const storedUserEmail = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_EMAIL);
    const storedCloneMethod = localStorage.getItem(LOCAL_STORAGE_KEYS.CLONE_METHOD);

    // Set state if values are not empty
    if (storedUserId) setUserId(storedUserId);
    if (storedUserName) setUserName(storedUserName);
    if (storedSshProfileName) setSshProfileName(storedSshProfileName);
    if (storedUserEmail) setUserEmail(storedUserEmail);
    if (storedCloneMethod) setCloneMethod(storedCloneMethod);
  }, []); // Empty dependency array to run only on mount

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserIdError("");
    setUserEmailError("");

    // Validate user ID and email
    const idNumber = Number(userId);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let hasError = false;

    if (isNaN(idNumber) || idNumber <= 0) {
      setUserIdError("Please enter a valid positive number for User ID.");
      hasError = true;
    }

    if (!!userEmail && !emailPattern.test(userEmail)) {
      setUserEmailError("Please enter a valid email address.");
      hasError = true;
    }

    if (hasError) {
      return;
    }

    // Store user data in local storage with prefix
    localStorage.setItem(LOCAL_STORAGE_KEYS.USER_ID, userId);
    localStorage.setItem(LOCAL_STORAGE_KEYS.USER_NAME, userName);
    localStorage.setItem(LOCAL_STORAGE_KEYS.SSH_PROFILE_NAME, sshProfileName);
    localStorage.setItem(LOCAL_STORAGE_KEYS.USER_EMAIL, userEmail);
    localStorage.setItem(LOCAL_STORAGE_KEYS.CLONE_METHOD, cloneMethod);

    // Show overlay and redirect after a short delay
    setShowOverlay(true);
    setTimeout(() => {
      setShowOverlay(false); // Hide overlay before redirecting
      router.push("/");
    }, 700); // Redirect after 0. seconds
  };

  return (
    <>
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Welcome! Please enter your details:
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="User ID"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!userIdError}
            helperText={userIdError}
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />

          <TextField
            label="User Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />

          <TextField
            label="User Email"
            variant="outlined"
            fullWidth
            margin="normal"
            error={!!userEmailError}
            helperText={
              userEmailError ||
              `If left blank, the tool will use ${
                userId ? userId : "(userid)"
              }+${
                userName ? userName : "(username)"
              }@users.noreply.github.com as your email.`
            }
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />

          <Box margin="normal">
            <Select
              value={cloneMethod}
              onChange={(e) => setCloneMethod(e.target.value)}
              fullWidth
              required
            >
              <MenuItem value={CLONE_METHODS.SSH}>{CLONE_METHODS.SSH}</MenuItem>
              <MenuItem value={CLONE_METHODS.HTTPS}>
                {CLONE_METHODS.HTTPS}
              </MenuItem>
            </Select>
          </Box>

          <TextField
            label="SSH Profile Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={sshProfileName}
            onChange={(e) => setSshProfileName(e.target.value)}
            required={cloneMethod === CLONE_METHODS.SSH}
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </form>
      </Container>
      {showOverlay && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(76, 175, 80, 0.2)", // Adjusted transparency
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <CircularProgress color="inherit" />
          <Typography variant="h5" color="white" sx={{ marginLeft: 2 }}>
            Your settings have been saved! Redirecting...
          </Typography>
        </Box>
      )}
    </>
  );
}
