import React from "react";
import { Box, Button, TextField, Typography, Paper } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { setToken } from "../Store/userTokenSlice";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../Services/authApi";

// Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(4, "Too short!").required("Password is required"),
});

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ← Get mutation hook here
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (values: { email: string; password: string }) => {
    try {
      const res = await login(values).unwrap();

      dispatch(setToken({ token: res.token, user: res.user }));

      navigate("/dashboard");
    } catch (err: any) {
      console.error(err);
      const msg = err?.data?.message || "Login failed";
      alert(msg);
    }
  };

  return (
    <Box
      sx={{
        height: "90vh",
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
          width: { xs: "90%", sm: "300px" },
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
                disabled={isLoading}
                sx={{
                  background: "goldenrod",
                  textTransform: "none",
                  fontWeight: 600,
                  borderRadius: 2,
                }}
              >
                {isLoading ? "Logging in..." : "Login"}
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