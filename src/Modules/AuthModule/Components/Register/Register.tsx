/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  NativeSelect,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { AUTH_URLS } from "../../../../Constants/END-POINTS";
import { emailValidation, passwordValidation } from "../../../../Constants/VALIDATIONS";

interface FormValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role: string;
}
export default function Register() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async(data: FormValues) => {
    try {
      const response = await axios.post(AUTH_URLS.register , data)
      toast.success(response?.data?.message);
      navigate('/login')
    } catch (error:any) {
      toast.error(error?.response?.data?.message)
    }
  };

  return (
    <>
      <Box textAlign="start" mb={3}>
        <Typography variant="body1" color="textSecondary">
          Create new account
        </Typography>
        <Typography variant="h4">Register</Typography>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: "100%", mt: 2 }}
      >
          <Grid container spacing={2} sx={{my:2}}>
            {/* First Name */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                id="first_name"
                type="text"
                label="First Name"
                variant="outlined"
                fullWidth
                error={!!errors?.first_name}
                helperText={errors?.first_name?.message}
                {...register("first_name", {required: "First Name is required!" })}
              />
            </Grid>

            {/* Last Name */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                id="last_name"
                type="text"
                label="Last Name"
                variant="outlined"
                fullWidth
                error={!!errors?.last_name}
                helperText={errors?.last_name?.message}
                {...register("last_name", {required: "Last Name is required!" })}
              />
            </Grid>
          </Grid>
          
          {/* email */}
          <TextField
            id="email"
            type="email"
            label="Email"
            variant="outlined"
            fullWidth
            error={!!errors?.email}
            helperText={errors?.email?.message}
            {...register("email", emailValidation)}
          />

          {/* password */}
          <TextField
            sx={{ my: 2 }}
            id="password"
            type="password"
            label="password"
            variant="outlined"
            fullWidth
            error={!!errors?.password}
            helperText={errors?.password?.message}
            {...register("password", passwordValidation)}
          />

          {/* role */}
          <FormControl fullWidth>
            <InputLabel variant="standard" htmlFor="role">
              Role
            </InputLabel>
            <NativeSelect
              defaultValue='Admin'
              {...register("role", { required: "Role is required" })}
              inputProps={{
                id: 'role',
              }}
            >
              <option value="Admin">Admin</option>
              <option value="Customer">Customer</option>
            </NativeSelect>
          </FormControl>

          <Stack direction="column">
            <Button
              type="submit"
              color="warning"
              variant="contained"
              fullWidth
              sx={{ mt: 2, padding: "10px" }}
            >
              Register
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                mt: 2,
                padding: "10px",
                color: "#6251DD",
                borderColor: "#6251DD",
              }}
              onClick={()=>navigate('/login')}
            >
              Login
            </Button>
          </Stack>
      </Box>
    </>
  );
}
