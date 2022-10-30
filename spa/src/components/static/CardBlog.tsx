import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Box, CardActionArea, CardActions, Stack } from '@mui/material'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'

interface ICardBlogProps {
  id: string
  img: string
  excerpt: string
  title: string
  type: 'first' | 'second'
  author: string
  category: string
  published: string
  view: number
  onClick: (event: string) => void
}

export default function CardBlog(props: ICardBlogProps) {
  return (
    <Card sx={{ width: '100%' }}>
      <CardActionArea onClick={() => props.onClick(props.id)}>
        <CardMedia
          component="img"
          height={props.type === 'first' ? '440' : '120'}
          image={
            props.img === ''
              ? 'https://source.unsplash.com/1200x400?document'
              : props.img
          }
          alt={props.category}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            align={'center'}
          >
            {props.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align={props.type === 'first' ? 'center' : 'left'}
          >
            {props.excerpt}...
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            display={'flex'}
            sx={{ mt: 1 }}
            justifyContent={props.type === 'first' ? 'center' : 'flex-end'}
          >
            {props.published}
          </Typography>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            gap={1}
            sx={{ mt: 1 }}
          >
            <RemoveRedEyeIcon sx={{ ml: 2 }} />
            {props.view}
          </Stack>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Typography
          variant="subtitle1"
          component="div"
          align={props.type === 'first' ? 'center' : 'left'}
          width={'100%'}
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            gap={1}
          >
            By.{' '}
            <Box component="div" sx={{ color: '#2196f3' }}>
              {props.author}
            </Box>{' '}
            in{' '}
            <Box component="div" sx={{ color: '#2196f3' }}>
              {props.category}
            </Box>
          </Stack>
        </Typography>
      </CardActions>
    </Card>
  )
}
