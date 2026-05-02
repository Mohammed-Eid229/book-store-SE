/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Checkbox,
  Grid,
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
  email: string;
  otp: string
  password: string;
}
export default function ResetPassword() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async(data: FormValues) => {
    try {
      const response = await axios.post(AUTH_URLS.resetpass , data)
      toast.success(response?.data?.message);
      navigate('/login')
    } catch (error:any) {
      const msg = error?.response?.data?.message;
      toast.error(Array.isArray(msg) ? msg[0] : msg || "Something went wrong");
    }
  };

  return (
    <>
      <Box textAlign="start" mb={4}>
        <Typography variant="body1" color="textSecondary">
          Welcome Back!
        </Typography>
        <Typography variant="h4">Reset Your Password Now!</Typography>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: "100%", mt: 2 }}
      >
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

        {/* otp */}
        <TextField
          sx={{ my: 2 }}
          id="otp"
          type="otp"
          label="OTP"
          variant="outlined"
          fullWidth
          error={!!errors?.otp}
          helperText={errors?.otp?.message}
          {...register("otp", { required: "OTP is required!" })}
        />

        {/* password */}
        <TextField
          sx={{ mb: 1 }}
          id="password"
          type="password"
          label="password"
          variant="outlined"
          fullWidth
          error={!!errors?.password}
          helperText={errors?.password?.message}
          {...register("password", passwordValidation)}
        />
        <Grid
          container
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack
            direction="row"
            display="flex"
            alignItems="center"
            sx={{ color: "#6251DD" }}
          >
            <Checkbox sx={{ color: "#6251DD" }} />
            <Typography variant="body2">Remember me</Typography>
          </Stack>
        </Grid>
        <Stack direction="column">
          <Button
            type="submit"
            color="warning"
            variant="contained"
            fullWidth
            sx={{ mt: 2, padding: "10px" }}
          >
            Send
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
