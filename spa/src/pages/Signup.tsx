import { useEffect } from 'react'
import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { postUser } from '../api'
import AlertComponent from '../components/static/AlertComponent'
import { BackdropMUI } from '../components/MUI'

const theme = createTheme()

export default function Signup() {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [dataErrorMessage, setDataErrorMessage] = React.useState<{
    status: boolean
    severity: 'error' | 'warning' | 'info' | 'success'
    label: string
  }>({ status: false, label: '', severity: 'error' })

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    if (data.get('password') !== data.get('confirmPassword')) {
      window.alert("Password don't match.")
      return
    }

    setLoading(true)
    const resUser = await postUser({
      first_name: data.get('firstName') as string,
      last_name: data.get('lastName') as string,
      email: data.get('email') as string,
      password: data.get('password') as string,
    })

    if (resUser.status !== 200) {
      setDataErrorMessage({
        status: true,
        label: resUser.data.message,
        severity: 'error',
      })

      setLoading(false)
      return
    }

    setDataErrorMessage({
      status: true,
      label: 'successfully created account.',
      severity: 'success',
    })

    setLoading(false)
    window.location.href = '/signin'
  }

  useEffect(() => {
    document.title = 'Sign Up'
  }, [])

  return (
    <>
      <BackdropMUI open={loading} />

      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="xs"
          sx={{ backgroundColor: '#fff', mt: 4 }}
        >
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              // noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3, mb: 4 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <AlertComponent
                    severity={dataErrorMessage.severity}
                    label={dataErrorMessage.label}
                    sx={{
                      mt: 2,
                      display: dataErrorMessage.status ? 'undefine' : 'none',
                      width: '100%',
                    }}
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
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    id="confirm-password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signin" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  )
}
