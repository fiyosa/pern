import { useEffect, useState } from 'react'
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
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Grid, Stack } from '@mui/material'
import ListAltIcon from '@mui/icons-material/ListAlt'
import { postCategorie } from '../../api'
import { ISnackbarData, SnackbarData, SnackbarMUI } from '../../components/MUI'
import { useNavigate } from 'react-router-dom'

const theme = createTheme()

export default function ViewCategoriesCreate(): JSX.Element {
  const [dataSnackbar, setDataSnackbar] = useState<ISnackbarData>(SnackbarData)

  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const resCategory = await postCategorie({
      category: data.get('category') as string,
      description: data.get('description') as string,
    })

    if (resCategory.status !== 200) {
      window.alert(resCategory.data.message)
    }
    navigate('/view-categories')
  }

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
        style={{ fontSize: 21 }}
      />

      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="sm"
          sx={{ backgroundColor: '#fff', mt: 4 }}
        >
          <Box sx={{ width: '100%', mb: 2 }}>
            <Link href="/view-categories" underline="none">
              <Stack direction="row" alignItems="center" gap={1}>
                <ArrowBackIcon sx={{ color: '#8A8D9C', fontSize: 25 }} />
                <Typography sx={{ color: '#8A8D9C', fontSize: 23 }}>
                  Back to View Categories
                </Typography>
              </Stack>
            </Link>
          </Box>
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
              <ListAltIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create Category
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, mb: 4 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="given-name"
                    name="category"
                    required
                    fullWidth
                    id="category"
                    label="Category"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    sx={{ width: '100%' }}
                    id="outlined-textarea"
                    label="Description"
                    multiline
                    name="description"
                    required
                    minRows={5}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  )
}
