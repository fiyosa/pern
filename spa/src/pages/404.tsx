import { Grid } from '@mui/material'
import { useEffect } from 'react'
import Img404 from '../assets/img/img-404.png'

export default function NotFound() {
  useEffect(() => {
    document.title = '404 page not found'
  }, [])

  return (
    <>
      <Grid item xs={12} md={12}>
        <img alt="404" src={Img404} />
      </Grid>
    </>
  )
}
