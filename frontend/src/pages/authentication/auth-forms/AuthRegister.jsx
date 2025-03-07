import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Stack, Typography, InputLabel, OutlinedInput, FormHelperText, Box, FormControl } from '@mui/material';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function AuthRegister() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Formik
      initialValues={{ firstname: '', lastname: '', email: '', company: '', password: '', submit: null }}
      validationSchema={Yup.object({
        firstname: Yup.string().max(255).required('First Name is required'),
        lastname: Yup.string().max(255).required('Last Name is required'),
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').max(255).required('Password is required')
      })}
      onSubmit={async (values, { setErrors, setSubmitting }) => {
        try {
          const response = await axios.post('http://localhost:5000/register', values);
          alert(response.data.message);
        } catch (error) {
          setErrors({ submit: error.response?.data?.message || 'Something went wrong' });
        }
        setSubmitting(false);
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="firstname">First Name*</InputLabel>
                <OutlinedInput
                  id="firstname"
                  type="text"
                  value={values.firstname}
                  name="firstname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="John"
                  fullWidth
                  error={Boolean(touched.firstname && errors.firstname)}
                />
                {touched.firstname && errors.firstname && <FormHelperText error>{errors.firstname}</FormHelperText>}
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="lastname">Last Name*</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="lastname"
                  type="text"
                  value={values.lastname}
                  name="lastname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Doe"
                  error={Boolean(touched.lastname && errors.lastname)}
                />
                {touched.lastname && errors.lastname && <FormHelperText error>{errors.lastname}</FormHelperText>}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email">Email Address*</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="email"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="demo@company.com"
                  error={Boolean(touched.email && errors.email)}
                />
                {touched.email && errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="password">Password*</InputLabel>
                <OutlinedInput
                  fullWidth
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="******"
                  error={Boolean(touched.password && errors.password)}
                />
                {touched.password && errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Button disableElevation fullWidth size="large" type="submit" variant="contained" color="primary">
                Create Account
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
