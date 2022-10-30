import { FormEvent, useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Stack } from '@mui/material'
import { postLogin } from '../api'
import AlertComponent from '../components/static/AlertComponent'
import { BackdropMUI, TextFieldPwdMUI } from '../components/MUI'

const theme = createTheme()

export default function Signin() {
  const [dataErrorMessage, setDataErrorMessage] = useState<{
    status: boolean
    severity: 'error' | 'warning' | 'info' | 'success'
    label: string
  }>({ status: false, label: '', severity: 'error' })
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setLoading(true)

    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const fetchPostLogin = await postLogin({
      username: data.get('username') as string,
      password: data.get('password') as string,
    })

    if (fetchPostLogin.data.success === false) {
      setDataErrorMessage({
        status: true,
        label: fetchPostLogin.data.message,
        severity: 'error',
      })
      setLoading(false)
      return
    }

    setDataErrorMessage({
      status: true,
      label: 'Login Success.',
      severity: 'success',
    })

    window.localStorage.setItem('token', fetchPostLogin.data.access_token as string)
    setLoading(false)
    window.location.href = '/'
  }

  useEffect(() => {
    document.title = 'Sign In'
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
              marginTop: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 4,
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>

            <AlertComponent
              severity={dataErrorMessage.severity}
              label={dataErrorMessage.label}
              sx={{
                mt: 2,
                display: dataErrorMessage.status ? 'undefine' : 'none',
                width: '100%',
              }}
            />

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Username"
                name="username"
                autoComplete="email"
                autoFocus
                required
              />
              <TextFieldPwdMUI
                label="Password"
                width="100%"
                size="medium"
                name="password"
                sx={{ width: '100%', mt: 2 }}
                required
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Stack
                direction="row"
                justifyContent="flex-end"
                alignItems="center"
                gap={1}
              >
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Stack>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  )
}
