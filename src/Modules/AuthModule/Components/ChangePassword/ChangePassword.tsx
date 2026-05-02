/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { AUTH_URLS } from "../../../../Constants/END-POINTS";
import { passwordValidation } from "../../../../Constants/VALIDATIONS";

interface FormValues {
  password: string;
  password_new: string;
}
export default function ChangePassword() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
  try {
    const token = localStorage.getItem("userToken");
    const response = await axios.post(AUTH_URLS.changepass , data ,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

    toast.success(response?.data?.message);
    navigate("/dashboard");
    
  } catch (error: any) {
    toast.error(error?.response?.data?.message);
  }
};

  return (
    <>
      <Box textAlign="start" mb={4}>
        <Typography variant="body1" color="textSecondary">
          Welcome Back!
        </Typography>
        <Typography variant="h4">Change your Password Easily!</Typography>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: "100%", mt: 2 }}
      >

        {/* password */}
        <TextField
          sx={{ my: 2 }}
          id="password"
          type="password"
          label="Old Password"
          variant="outlined"
          fullWidth
          error={!!errors?.password}
          helperText={errors?.password?.message}
          {...register("password", passwordValidation)}
        />

        {/* new password */}
        <TextField
          sx={{ my: 2 }}
          id="password_new"
          type="password"
          label="New Password"
          variant="outlined"
          fullWidth
          error={!!errors?.password_new}
          helperText={errors?.password_new?.message}
          {...register("password_new", passwordValidation)}
        />
        <Stack>
          <Button
            type="submit"
            color="warning"
            variant="contained"
            fullWidth
            sx={{ mt: 2, padding: "10px" }}
          >
            Save
          </Button>
        </Stack>
      </Box>
    </>
  );
}
