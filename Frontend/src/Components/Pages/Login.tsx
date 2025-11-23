import React from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setToken } from "../../Store/userTokenSlice";
import { useNavigate } from "react-router-dom";
import api from "../../Lib/axiosInstance"; // Axios instance

// Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(4, "Too short!")
    .required("Password is required"),
});

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const res = await api.post("/auth/login", values);
      dispatch(setToken({ token: res.data.token, user: res.data.user }));
      navigate("/dashboard");
    } catch (err: any) {
      console.error(err);
      const msg = err?.response?.data?.message || "Login failed";
      alert(msg);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        backgroundColor: "#f9f9f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: { xs: "90%", sm: "400px" },
          padding: 4,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            textAlign: "center",
            mb: 3,
            letterSpacing: 0.5,
          }}
        >
          Login
        </Typography>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            isSubmitting,
          }) => (
            <Form>
              <TextField
                fullWidth
                variant="outlined"
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                variant="outlined"
                type="password"
                label="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                sx={{ mb: 3 }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 2,
                }}
              >
                Login
              </Button>

              <Typography
                variant="body2"
                sx={{ textAlign: "center", mt: 2, opacity: 0.7 }}
              >
                © Inventory Manager
              </Typography>
            </Form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default Login;