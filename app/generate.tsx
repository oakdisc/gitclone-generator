"use client";
import { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import { CLONE_METHODS, LOCAL_STORAGE_KEYS } from "./utils/constants";
import { CopyBlock } from "react-code-blocks";
import { useRouter } from "next/navigation";

export default function Generate() {
  const [repoName, setRepoName] = useState("");
  const [commands, setCommands] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const inputRepoName = repoName.split("/").pop();
    if (typeof inputRepoName === "string") {
      const userId = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ID);
      const userName = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_NAME);
      const sshProfileName = localStorage.getItem(
        LOCAL_STORAGE_KEYS.SSH_PROFILE_NAME
      );
      const userEmail = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_EMAIL);
      const cloneMethod = localStorage.getItem(LOCAL_STORAGE_KEYS.CLONE_METHOD);

      let repoName = inputRepoName.trim();
      if (!repoName.endsWith(".git")) repoName += ".git";

      let newCommands = "";

      switch (cloneMethod) {
        case CLONE_METHODS.SSH:
          newCommands = `git clone ssh://${sshProfileName}/${userName}/${repoName}`;
          break;
        case CLONE_METHODS.HTTPS:
          newCommands = `git clone https://github.com/${userName}/${repoName}.git`;
          break;
        default:
          newCommands = `# Error: Invalid clone method`;
          break;
      }

      newCommands += `cd ${repoName}\n`;

      newCommands += `git config --local user.name "${userName}"\n`;
      if (userEmail)
        newCommands += `git config --local user.email "${userEmail}"\n`;
      else
        newCommands += `git config --local user.email "${userId}+${userName}@users.noreply.github.com"\n`;

      newCommands += `echo Successfully configured your git repository\n`;

      setCommands(newCommands);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "auto", padding: 2 }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Repository Name"
          variant="outlined"
          fullWidth
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
          required
          sx={{ marginBottom: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
        >
          Generate
        </Button>
      </form>
      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        sx={{ marginTop: 2 }}
        onClick={() => router.push("/welcome")}
      >
        Settings
      </Button>
      {commands && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">Clone Command:</Typography>
          <CopyBlock
            text={commands}
            language="sh"
            showLineNumbers={true}
            copied={false}
          />
        </Box>
      )}
    </Box>
  );
}
