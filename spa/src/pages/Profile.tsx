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
import { Divider } from '@mui/material'
import { useAppSelector } from '../redux/hooks'
import { putAuthUserProfile, putAuthUserPwd } from '../api'
import {
  ISnackbarData,
  SnackbarData,
  SnackbarMUI,
  TextFieldPwdMUI,
} from '../components/MUI'
import { useNavigate } from 'react-router-dom'

const theme = createTheme()

interface dataProfileModel {
  id: string
  first_name: string
  last_name: string
  email: string
}

const dataProfileSet: dataProfileModel = {
  id: '',
  first_name: '-',
  last_name: '-',
  email: '-',
}

export default function Profile() {
  const [dataSnackbar, setDataSnackbar] =
    React.useState<ISnackbarData>(SnackbarData)

  const dataUser = useAppSelector((state) => state.userReducer)
  const navigate = useNavigate()

  const handleEditAccount = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const resUser = await putAuthUserProfile({
      user_id: dataUser.data?.id ?? '',
      first_name: data.get('first_name') as string,
      last_name: data.get('last_name') as string,
    })

    if (resUser.status !== 200) {
      setDataSnackbar({
        open: true,
        comment: resUser.data?.message ?? 'Failed update account.',
        severity: 'error',
      })
      window.alert(resUser.data?.message ?? 'Failed update account.')
    }

    window.location.reload()
  }

  const handlePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    if (data.get('password') !== data.get('confirm-password')) {
      setDataSnackbar({
        open: true,
        comment: 'Password does not match.',
        severity: 'error',
      })
      return
    }

    const resUser = await putAuthUserPwd({
      user_id: dataUser.data?.id ?? '',
      old_password: data.get('old-password') as string,
      password: data.get('password') as string,
    })

    if (resUser.status !== 200) {
      window.alert(resUser.data?.message ?? 'Failed update account.')
      return
    }

    window.location.reload()
  }

  useEffect(() => {
    document.title = 'Profile'
  }, [])

  return (
    <>
      <SnackbarMUI
        open={dataSnackbar.open}
        close={() => setDataSnackbar({ ...dataSnackbar, open: false })}
        timer={4000}
        severity={dataSnackbar.severity}
        position={{ vertical: 'top', horizontal: 'center' }}
        comment={dataSnackbar.comment}
        iconSize={'medium'}
        style={{ fontSize: 23 }}
      />

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
              Profile
            </Typography>
            <Box component={'div'} sx={{ mt: 3, mb: 4 }}>
              {dataUser.data.email !== '' && (
                <>
                  {/* Email */}
                  <Grid item xs={12} sx={{ mb: 2 }}>
                    <TextField
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={dataUser.data.email}
                    />
                  </Grid>

                  {/* Profile */}
                  <Box component="form" onSubmit={handleEditAccount}>
                    <Grid container spacing={2}>
                      {/* First Name */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          autoComplete="given-name"
                          name="first_name"
                          fullWidth
                          id="firstName"
                          label="First Name"
                          required
                          defaultValue={dataUser.data.first_name}
                        />
                      </Grid>

                      {/* Last Name */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          id="lastName"
                          label="Last Name"
                          name="last_name"
                          autoComplete="family-name"
                          defaultValue={dataUser.data.last_name}
                          required
                        />
                      </Grid>

                      {/* Button Submit Profile */}
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Change Profile
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </>
              )}

              {/* Divider */}
              <Grid item xs={12}>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              {/* Password */}
              <Box component="form" onSubmit={handlePassword}>
                <Grid container spacing={2}>
                  {/* Input Old Pwd */}
                  <Grid item xs={12}>
                    <TextFieldPwdMUI
                      id={'pwd-1'}
                      label="Old Password"
                      width="100%"
                      size="medium"
                      name="old-password"
                      autoComplete="new-password"
                      sx={{ width: '100%' }}
                      required
                    />
                  </Grid>

                  {/* Input New Password */}
                  <Grid item xs={12}>
                    <TextFieldPwdMUI
                      id={'pwd-2'}
                      label="Password"
                      size="medium"
                      name="password"
                      autoComplete="new-password"
                      sx={{ width: '100%' }}
                      required
                    />
                  </Grid>

                  {/* Input Confirm Pwd */}
                  <Grid item xs={12}>
                    <TextFieldPwdMUI
                      id={'pwd-3'}
                      label="Confirm Password"
                      size="medium"
                      name="confirm-password"
                      autoComplete="new-password"
                      sx={{ width: '100%' }}
                      required
                    />
                  </Grid>

                  {/* Button Submit Pwd */}
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Change Password
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  )
}
