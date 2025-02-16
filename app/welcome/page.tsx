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
} from "@mui/material";
import { useRouter } from "next/navigation";
import { LOCAL_STORAGE_KEYS, CLONE_METHODS } from "../utils/constants";

export default function Welcome() {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [sshProfileName, setSshProfileName] = useState("git@github.com");
  const [userEmail, setUserEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [userIdError, setUserIdError] = useState("");
  const [userEmailError, setUserEmailError] = useState("");
  const [cloneMethod, setCloneMethod] = useState(CLONE_METHODS.SSH);
  const router = useRouter();

  useEffect(() => {
    // Retrieve values from localStorage
    const storedUserId = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ID);
    const storedUserName = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_NAME);
    const storedSshProfileName = localStorage.getItem(
      LOCAL_STORAGE_KEYS.SSH_PROFILE_NAME
    );
    const storedUserEmail = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_EMAIL);

    // Set state if values are not empty
    if (storedUserId) setUserId(storedUserId);
    if (storedUserName) setUserName(storedUserName);
    if (storedSshProfileName) setSshProfileName(storedSshProfileName);
    if (storedUserEmail) setUserEmail(storedUserEmail);
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

    // Set success state
    setSuccess(true);
  };

  if (success) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Success!
        </Typography>
        <Typography variant="body1">
          Your details have been successfully stored.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/")}
        >
          Go to Home
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Welcome! Please enter your details:
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="user-id"
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
          id="user-name"
          label="User Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />

        <TextField
          id="user-email"
          label="User Email"
          variant="outlined"
          fullWidth
          margin="normal"
          error={!!userEmailError}
          helperText={
            userEmailError ||
            `If left blank, the tool will use ${userId ? userId : "(userid)"}+${
              userName ? userName : "(username)"
            }@users.noreply.github.com as your email.`
          }
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />

        <Box margin="normal">
          <Select
            id="clone-method"
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
          id="ssh-profile-name"
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
  );
}
