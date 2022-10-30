import {
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material'
import ImgLaravel from '../assets/resource/img-laravel.svg'
import ImgReact from '../assets/resource/img-react.svg'
import ImgGithub from '../assets/resource/img-github.svg'
import { useEffect } from 'react'

export default function About(): JSX.Element {
  useEffect(() => {
    document.title = 'About'
  }, [])

  return (
    <>
      <Container component="main" maxWidth="md" sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Grid item xs={12}>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ mb: 5 }}
              >
                <Typography variant="h3" component="div">
                  FRAMEWORK
                </Typography>
              </Stack>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={20}
              >
                <Link
                  target="_blank"
                  href="https://laravel.com/"
                  underline="none"
                >
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <img
                      src={ImgLaravel}
                      alt="laravel"
                      height={'200px'}
                      width={'200px'}
                    />
                    <Typography variant="h5" component="div">
                      Laravel
                    </Typography>
                  </Stack>
                </Link>
                <Link
                  target="_blank"
                  href="https://create-react-app.dev/"
                  underline="none"
                >
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <img
                      // src={'/assets/resource/img-react.svg'}
                      src={ImgReact}
                      alt="react"
                      height={'200px'}
                      width={'200px'}
                    />
                    <Typography variant="h5" component="div">
                      React Typescript
                    </Typography>
                  </Stack>
                </Link>
              </Stack>
            </Grid>
            <Divider sx={{ my: 2 }} />
            <Grid item xs={12}>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                sx={{ mb: 5 }}
              >
                <Link
                  target="_blank"
                  href="https://github.com/fiyosa/laravel-react-ts-mysql-myblog"
                  underline="none"
                >
                  <Stack
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <img
                      // src={'/assets/resource/img-github.svg'}
                      src={ImgGithub}
                      alt="laravel"
                      height={'200px'}
                      width={'200px'}
                    />
                    <Typography variant="h5" component="div">
                      Check my code
                    </Typography>
                  </Stack>
                </Link>
              </Stack>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}
