import { Grid, Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import SearchBox from '../components/static/SearchBox'
import CardBlog from '../components/static/CardBlog'
import {
  ISnackbarData,
  PaginationMUI,
  SnackbarData,
  SnackbarMUI,
} from '../components/MUI'
import { getBlogsPublic, postBlogAddView } from '../api'
import { useNavigate } from 'react-router-dom'

interface dataBlogsModel {
  id: string
  img: string
  excerpt: string
  title: string
  author: string
  category: string
  published: string
  view: number
}

export default function Blogs() {
  const [dataSnackbar, setDataSnackbar] = useState<ISnackbarData>(SnackbarData)

  const [dataPage, setDataPage] = useState<number>(0)
  const [dataLimit, setDataLimit] = useState<number>(13)
  const [dataTotal, setDataTotal] = useState<number>(0)

  const [dataSearch, setDataSearch] = useState<string>('')
  const [dataSearchOld, setDataSearchOld] = useState<string>('')

  const [dataBlogs, setDataBlogs] = useState<dataBlogsModel[]>([])

  const navigate = useNavigate()

  const fetchGetBlogs = async () => {
    const url: string = `?page=${dataPage + 1}&limit=${dataLimit}${dataSearch !== '' ? `&keyword=${dataSearch}` : ''
      }`
    const resBlogs = await getBlogsPublic(url)

    if (resBlogs.data.success === false) {
      setDataSnackbar({
        open: true,
        comment: 'Failed get data blogs.',
        severity: 'error',
      })
      return
    }

    const listMyBlogs: dataBlogsModel[] = []
    for (const value of resBlogs.data.data || []) {
      listMyBlogs.push({
        id: value.id,
        title: value.title,
        category: value.category_name,
        published: value.published_at,
        view: value.view,
        excerpt: value.excerpt,
        img: value.image,
        author: value.user_first_name + ' ' + value.user_last_name,
      })
    }

    setDataBlogs(listMyBlogs)
    setDataTotal(resBlogs.data.extra.total)
  }

  const fetchPutBlogView = async (id: string) => {
    await postBlogAddView(id)
    navigate(`/blogs/${id}`)
  }

  useEffect(() => {
    document.title = 'Blogs'
  }, [])

  useEffect(() => {
    if (dataSearch === '') fetchGetBlogs()

    const interval = setInterval(() => {
      if (dataSearch !== dataSearchOld) {
        setDataSearchOld(dataSearch)
        fetchGetBlogs()
      }
    }, 500)
    return () => clearInterval(interval)
  }, [dataPage, dataLimit, dataSearch, dataSearchOld])

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

      <Grid item xs={12} md={12}>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <SearchBox onChange={(event: string) => setDataSearch(event)} />
        </Stack>
      </Grid>

      {dataBlogs.length > 0 && (
        <Grid item xs={12} md={12}>
          <CardBlog
            id={dataBlogs[0].id}
            img={dataBlogs[0].img}
            excerpt={dataBlogs[0].excerpt}
            title={dataBlogs[0].title}
            author={dataBlogs[0].author}
            category={dataBlogs[0].category}
            published={dataBlogs[0].published}
            view={dataBlogs[0].view}
            type="first"
            onClick={fetchPutBlogView}
          />
        </Grid>
      )}

      {dataBlogs.length > 1 &&
        dataBlogs.map((value: dataBlogsModel, index: number) => {
          if (index !== 0)
            return (
              <Grid item xs={3} md={3} key={index}>
                <CardBlog
                  id={value.id}
                  img={value.img}
                  excerpt={value.excerpt}
                  title={value.title}
                  author={value.author}
                  category={value.category}
                  published={value.published}
                  view={value.view}
                  type="second"
                  onClick={fetchPutBlogView}
                />
              </Grid>
            )
        })}

      <Grid item xs={12} md={12}>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          sx={{ backgroundColor: '#fff' }}
        >
          <PaginationMUI
            page={dataPage}
            limit={dataLimit}
            total={dataTotal}
            listLimit={[5, 9, 13, 17]}
            onPageChange={(event: number) => setDataPage(event)}
            onLimitChange={(event: number) => setDataLimit(event)}
          />
        </Stack>
      </Grid>
    </>
  )
}
