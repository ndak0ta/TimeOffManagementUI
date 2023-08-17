import { useRegister } from "@/lib/auth";
import { Button } from "@mui/base";
import {
  Box,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

type RegisterValues = {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: Date;
  hireDate: Date;
};

type RegisterFormProps = {
  onSuccess: () => void;
};

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
}: RegisterFormProps) => {
  const register = useRegister();
  const [values, setValues] = useState<RegisterValues>({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    dateOfBirth: new Date(),
    hireDate: new Date(),
  });

  const handleSubmit = async () => {
    await register.mutateAsync(values);
    onSuccess();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                onChange={(e) =>
                  setValues({ ...values, username: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e) =>
                  setValues({ ...values, firstName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                onChange={(e) =>
                  setValues({ ...values, lastName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="phoneNumber"
                label="Phone Number"
                name="phoneNumber"
                autoComplete="tel"
                onChange={(e) =>
                  setValues({ ...values, phoneNumber: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                autoComplete="address"
                onChange={(e) =>
                  setValues({ ...values, address: e.target.value })
                }
              />
            </Grid>
            {/* TODO datetime picker */}
            {/* <Grid item xs={12}> 
              <TextField
                required
                fullWidth
                id="dateOfBirth"
                label="Date of Birth"
                name="dateOfBirth"
                autoComplete="bday"
                onChange={(e) =>
                  setValues({ ...values, dateOfBirth: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="hireDate"
                label="Hire Date"
                name="hireDate"
                onChange={(e) =>
                  setValues({ ...values, hireDate: e.target.value })
                }
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            // @ts-ignore TODO: hata veriyor mu diye kontrol et
            fullWidth
            variant="contained"
            disabled={register.isLoading}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
