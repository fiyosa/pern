import { Grid, Stack } from '@mui/material'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import AddIcon from '@mui/icons-material/Add'
import { styled } from '@mui/material/styles'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
  AutocompleteMUI,
  IAutocomplete,
  ISnackbarData,
  SnackbarData,
  SnackbarMUI,
} from '../../components/MUI'
import imgUploadFile from '../../assets/img/img-upload-file.png'
import { postBlog } from '../../api'
import { useAppSelector } from '../../redux/hooks'
import { ICategoryData } from '../../model'
import { useNavigate } from 'react-router-dom'

const dummyCategories = [
  {
    id: 1,
    label: 'no 1',
  },
  {
    id: 2,
    label: 'no 2',
  },
  {
    id: 3,
    label: 'no 3',
  },
]

const theme = createTheme()

const Input = styled('input')({
  display: 'none',
})
interface IDtaImageModel {
  name: string
  size?: number
  file: string
}

const categoryFormat = (props: ICategoryData[]) => {
  const newCategoryFormat: IAutocomplete[] = []
  for (const value of props) {
    newCategoryFormat.push({
      id: value.id,
      label: value.name,
    })
  }
  return newCategoryFormat
}

export default function BlogCreate() {
  const [dataSnackbar, setDataSnackbar] = useState<ISnackbarData>(SnackbarData)

  const [dataCategory, setDataCategory] = useState<IAutocomplete>({
    id: -1,
    label: 'None',
  })
  const [dataImage, setDataImage] = useState<IDtaImageModel>({
    name: '',
    file: '',
  })

  const navigate = useNavigate()

  const dataUser = useAppSelector((state) => state.userReducer)
  const dataCategories = useAppSelector((state) => state.categoryReducer)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const resAddBlog = await postBlog({
      user_id: dataUser.data.id,
      title: data.get('title') as string,
      body: data.get('body') as string,
      category_id: dataCategory.id as string,
      image: data.get('image') as File,
    })
    if (resAddBlog.data.success === false) {
      setDataSnackbar({
        open: true,
        comment: resAddBlog.data.message,
        severity: 'error',
      })
      return
    }
    navigate('/my-blogs')
  }

  const handleImage = (event: ChangeEvent<HTMLInputElement> | undefined) => {
    if (!event) return
    const getFile: File | null = event?.target?.files !== null ? event?.target?.files[0] : null
    if (getFile === null) return
    if (
      getFile.type === 'image/jpeg' ||
      getFile.type === 'image/jpg' ||
      getFile.type === 'image/png'
    ) {
      setDataImage({
        name: getFile.name,
        file: URL.createObjectURL(getFile),
      })
    }
  }

  useEffect(() => {
    document.title = 'Create Blog'
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
        style={{ fontSize: 21 }}
      />

      <ThemeProvider theme={theme}>
        <Container
          component="main"
          maxWidth="lg"
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
            {/* Back to Previous */}
            <Box sx={{ width: '100%', mb: 2, ml: 45 }}>
              <Link href="/list-blogs" underline="none">
                <Stack direction="row" alignItems="center" gap={1}>
                  <ArrowBackIcon sx={{ color: '#8A8D9C', fontSize: 25 }} />
                  <Typography sx={{ color: '#8A8D9C', fontSize: 23 }}>
                    Back to My Blogs
                  </Typography>
                </Stack>
              </Link>
            </Box>

            {/* Header Page */}
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <AddIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Create Blog
            </Typography>

            <Box
              component="form"
              // noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 6, mb: 4 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    spacing={2}
                  >
                    {/* Input Image */}
                    <Box component="div" sx={{ width: '40%' }}>
                      <Box
                        component="div"
                        sx={{
                          width: '100%',
                          border: 1,
                          p: 2,
                          color: '#bdbdbd',
                          borderRadius: 1.2,
                        }}
                      >
                        <Box style={{ width: '250px', height: '250px' }} >
                          <img
                            alt="preview"
                            src={
                              dataImage.file !== ''
                                ? dataImage.file
                                : imgUploadFile
                            }
                            style={{
                              width: '200px',
                              height: '200px',
                              objectFit: 'cover',
                              display: 'block',
                              marginBlock: '16px',
                              marginLeft: 'auto',
                              marginRight: 'auto',
                            }}
                          />
                        </Box>
                        <Box>
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            spacing={1}
                          >
                            <label htmlFor="contained-button-file">
                              <Input
                                accept="image/*"
                                id="contained-button-file"
                                multiple
                                type="file"
                                name="image"
                                onChange={handleImage}
                              />
                              <Button variant="outlined" component="span">
                                Choose File
                              </Button>
                            </label>
                            <Typography
                              sx={{ display: 'inline', ml: 1 }}
                              style={{ color: '#424242' }}
                            >
                              {dataImage.name === ''
                                ? 'No File Selected'
                                : dataImage.name}
                            </Typography>
                          </Stack>
                        </Box>
                      </Box>
                    </Box>

                    <Stack
                      direction="column"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      spacing={2}
                      sx={{ width: '60%' }}
                    >
                      {/* Input Title */}
                      <TextField
                        autoComplete="off"
                        fullWidth
                        id="title"
                        label="Title"
                        autoFocus
                        name="title"
                        required
                      />

                      {/* Input Category */}
                      <Box component="div" sx={{ width: '100%' }}>
                        <AutocompleteMUI
                          name="category"
                          size="small"
                          data={categoryFormat(dataCategories.data)}
                          title={'Choose Category*'}
                          onChange={(event) => setDataCategory(event)}
                        />
                      </Box>
                    </Stack>
                  </Stack>
                </Grid>

                {/* Input Description */}
                <Grid item xs={12}>
                  <TextField
                    sx={{ width: '100%' }}
                    id="outlined-textarea"
                    label="Description"
                    placeholder="whatever you think !!!"
                    multiline
                    name="body"
                    required
                    minRows={5}
                  />
                </Grid>
              </Grid>

              {/* Button Action */}
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
