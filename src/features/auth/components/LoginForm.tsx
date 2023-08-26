import { Alert } from "@components/Alert";
import { useLogin } from "@lib/auth";
import {
  Box,
  Button,
  Grid,
  Link,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, Fragment, useState } from "react";

type LoginValues = {
  username: string;
  password: string;
};

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
}: LoginFormProps) => {
  const login = useLogin();
  const [values, setValues] = useState<LoginValues>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<any | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login.mutateAsync(values).catch((err) => {
      if (err.response.status === 401) {
        setError("Kullanıcı adı veya şifre hatalı");
        setSnackbarOpen(true);
        return;
      }
      setError(err.response.data.error);
    });

    if (login.isSuccess) {
      onSuccess();
    }
  };

  const handleSnacbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <Fragment>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Giriş Yap
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          onError={(err) => setError(err)}
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Kullanıcı adı"
            name="username"
            autoComplete="username"
            autoFocus
            aria-required
            onChange={(e) => setValues({ ...values, username: e.target.value })}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Şifre"
            type="password"
            id="password"
            autoComplete="current-password"
            aria-required
            onChange={(e) => setValues({ ...values, password: e.target.value })}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={login.isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            Giriş yap
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={handleSnacbarClose}
          >
            <Alert severity="error" onClose={handleSnacbarClose}>
              {error}
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </Fragment>
  );
};
