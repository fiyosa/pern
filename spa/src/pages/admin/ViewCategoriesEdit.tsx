import { ChangeEvent, useEffect, useState } from 'react'
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
import { useNavigate, useParams } from 'react-router-dom'
import { getCategoryById, putCategoryById } from '../../api'
import { CategoryDataModel, ICategoryData } from '../../model'
import { BackdropMUI } from '../../components/MUI'

const dummyData = {
  id: 'asd23x23',
  name: 'program',
  description: 'tes 1 2 3',
}

const theme = createTheme()

export default function ViewCategoriesEdit(): JSX.Element {
  const [loading, setLoading] = useState<boolean>(false)

  const [dataCategory, setDataCategory] =
    useState<ICategoryData>(CategoryDataModel)

  const navigate = useNavigate()
  const { paramId } = useParams()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const resCategory = await putCategoryById({
      id: paramId as string,
      category: data.get('category') as string,
      description: data.get('description') as string,
    })

    if (resCategory.status !== 200) {
      window.alert(resCategory.data.message)
    }
    navigate('/view-categories')
  }

  const fetchGetCategory = async () => {

    const resCategory = await getCategoryById(paramId)
    if (resCategory.status !== 200) {
      window.alert(resCategory.data?.message ?? 'Failed get data category.')
    }
    setDataCategory(resCategory.data.data as ICategoryData)
  }

  useEffect(() => {
    (async () => {
      setLoading(true)
      await fetchGetCategory()
      setLoading(false)
    })()
  }, [])

  return (
    <>
      <BackdropMUI open={loading} />

      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="sm"
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

            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <ListAltIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Edit Category
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3, mb: 4 }}
            >
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
                    value={dataCategory.name}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setDataCategory({
                        ...dataCategory,
                        name: event.target.value,
                      })
                    }
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
                    value={dataCategory.description}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      setDataCategory({
                        ...dataCategory,
                        description: event.target.value,
                      })
                    }
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
