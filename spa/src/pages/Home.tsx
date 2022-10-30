import { useEffect } from 'react'
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
import { Box } from '@mui/system'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  useEffect(() => {
    document.title = 'Dashboard'
  }, [])

  return (
    <>
      <Container component="main" maxWidth="sm" sx={{ mt: 4 }}>
        <Card>
          <CardContent>
            <Grid item xs={12}>
              <Typography gutterBottom variant="h5" component="div">
                Hi,
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                align="justify"
              >
                This website is intended to create blog data in the form of
                images and descriptions. Hope you like it.
              </Typography>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}
