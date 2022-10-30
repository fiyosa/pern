import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { Box, Button, Grid, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import Link from '@mui/material/Link'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate, useParams } from 'react-router-dom'
import { getBlogById } from '../../api'

const dummyBlog = {
  id: 'dw1dx12',
  img: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio tenetur ducimus at, itaque optio dignissimos dolor, asperiores deserunt porro, placeat ipsum! Vitae consectetur, saepe vero dignissimos eius hic fugit maxime fuga commodi recusandae, officia quisquam dolores! Vel enim dignissimos sunt mollitia amet cupiditate cum expedita veniam quod ab dolores saepe doloremque placeat, reprehenderit officiis aut nulla nobis consequuntur dolorum. Quaerat placeat consectetur ipsum aspernatur voluptas maxime eius ipsa ex quos eligendi, corporis atque natus blanditiis! Beatae eum quas omnis, eius consectetur voluptates reiciendis sunt ad impedit, a corporis! Quisquam quo dignissimos nesciunt, dolor iusto ratione nemo excepturi voluptatum ullam, ab adipisci. Dignissimos nemo optio harum veritatis cupiditate itaque voluptate neque cum suscipit animi explicabo dicta ex aperiam ipsam autem odit omnis doloribus nisi, aspernatur, dolores eligendi quaerat. Ipsam necessitatibus voluptatibus laudantium dolor optio alias laborum corporis, numquam ea dolore error molestias inventore velit, quam molestiae fugit magni dicta quo excepturi.',
  title: 'This is a ...',
  author: 'Fiyosa',
  category: 'Unknown',
  published: '02/05/2022',
  view: 1,
}

interface dataBlogDetailModel {
  id: string
  img: string
  description: string
  title: string
  author: string
  category: string
  published: string
  view: number
}

const dataBlogDetailSet: dataBlogDetailModel = {
  id: '',
  img: '',
  description: '',
  title: '',
  author: '',
  category: '',
  published: '',
  view: 0,
}

interface IBlogDetail {
  url?: string
}

export default function BlogDetail(props: IBlogDetail) {
  const [dataBlogDetail, setDataBlogDetail] =
    useState<dataBlogDetailModel>(dataBlogDetailSet)

  const navigate = useNavigate()
  const { paramId } = useParams()

  const fetchGetBlog = async () => {
    const resBlog = await getBlogById(paramId as string)

    if (!resBlog.data.success) {
      window.alert(resBlog.data.message)
      navigate('/')
      return
    }

    setDataBlogDetail({
      id: resBlog.data.data!.id,
      img: resBlog.data.data!.image,
      description: resBlog.data.data!.body as string,
      title: resBlog.data.data!.title,
      author:
        resBlog.data.data!.user_first_name +
        ' ' +
        resBlog.data.data!.user_last_name,
      category: resBlog.data.data!.category_name,
      published: resBlog.data.data!.published_at,
      view: resBlog.data.data!.view,
    })
  }

  useEffect(() => {
    document.title = 'Detail Blog'
    fetchGetBlog()
  }, [])

  return (
    <>
      <Grid item xs={12} md={12}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ pb: 2, pt: 2, backgroundColor: '#fff' }}
        >
          <Box>
            <Link
              href={props.hasOwnProperty('url') ? props.url : '/my-blogs'}
              underline="none"
            >
              <Stack direction="row" alignItems="center" gap={1}>
                <ArrowBackIcon sx={{ color: '#8A8D9C', fontSize: 25 }} />
                <Typography sx={{ color: '#8A8D9C', fontSize: 23 }}>
                  Back to Blogs
                </Typography>
              </Stack>
            </Link>
          </Box>
          <Button
            variant="contained"
            onClick={() => navigate(`/my-blogs-edit/${paramId}`)}
            sx={{ display: props.hasOwnProperty('url') ? 'none' : undefined }}
          >
            Edit Blog
          </Button>
        </Stack>
        <Card sx={{ width: '100%' }}>
          <CardMedia
            component="img"
            height="440"
            image={
              dataBlogDetail.img === ''
                ? 'https://source.unsplash.com/1200x400?document'
                : dataBlogDetail.img
            }
            alt={dataBlogDetail.category}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              align="center"
            >
              {dataBlogDetail.title}
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              align="center"
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
                  {dataBlogDetail.author}
                </Box>{' '}
                in{' '}
                <Box component="div" sx={{ color: '#2196f3' }}>
                  {dataBlogDetail.category}
                </Box>
                <RemoveRedEyeIcon sx={{ ml: 2 }} />
                {dataBlogDetail.view}
              </Stack>
            </Typography>
            <Typography variant="body2" color="text.secondary" align="justify">
              {dataBlogDetail.description}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}
