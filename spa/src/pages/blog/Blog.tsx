import { useEffect, useState } from 'react'
import { Button, Grid, Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'
import SearchBox from '../../components/static/SearchBox'
import BlogsListTable from '../../components/tables/BlogsListTable'
import { deleteBlog, getBlogsAuth } from '../../api'
import {
  DialogMUI,
  IDialog,
  ISnackbarData,
  SnackbarData,
  SnackbarMUI,
} from '../../components/MUI'
import { IBlogData } from '../../model'

const dummy = [
  {
    id: 'adxd1d1c1',
    title: 'dummy',
    category: 'test',
    published: '10/12/2022',
    view: 10,
  },
  {
    id: 'adxd1d1c1',
    title: 'dummy',
    category: 'test',
    published: '10/12/2022',
    view: 10,
  },
  {
    id: 'adxd1d1c1',
    title: 'dummy',
    category: 'test',
    published: '10/12/2022',
    view: 10,
  },
  {
    id: 'adxd1d1c1',
    title: 'dummy',
    category: 'test',
    published: '10/12/2022',
    view: 10,
  },
  {
    id: 'adxd1d1c1',
    title: 'dummy',
    category: 'test',
    published: '10/12/2022',
    view: 10,
  },
  {
    id: 'adxd1d1c1',
    title: 'dummy',
    category: 'test',
    published: '10/12/2022',
    view: 10,
  },
  {
    id: 'adxd1d1c1',
    title: 'dummy',
    category: 'test',
    published: '10/12/2022',
    view: 10,
  },
  {
    id: 'adxd1d1c1',
    title: 'dummy',
    category: 'test',
    published: '10/12/2022',
    view: 10,
  },
  {
    id: 'adxd1d1c1',
    title: 'dummy',
    category: 'test',
    published: '10/12/2022',
    view: 10,
  },
]

interface dataTableBlogsModel {
  id: string
  title: string
  category: string
  published: string
  view: number
}

export default function Blog() {
  const [dataSnackbar, setDataSnackbar] = useState<ISnackbarData>(SnackbarData)
  const [dataTableBlogs, setDataTableBlogs] = useState<dataTableBlogsModel[]>(
    []
  )
  const [dataDialog, setDataDialog] = useState<IDialog>({
    open: false,
    type: 'alert',
    label: '',
  })

  const [dataSearch, setDataSearch] = useState<string>('')
  const [dataSearchOld, setDataSearchOld] = useState<string>('')

  const [dataPage, setDataPage] = useState<number>(0)
  const [dataLimit, setDataLimit] = useState<number>(10)
  const [dataTotal, setDataTotal] = useState<number>(0)

  const navigate = useNavigate()

  const fetchGetMyBlogs = async () => {
    const urlMyBlogs = `?page=${dataPage + 1
      }&limit=${dataLimit}${dataSearch !== '' ? `&keyword=${dataSearch}` : ''}`
    const resMyBlogs = await getBlogsAuth(urlMyBlogs)

    if (resMyBlogs.data.success === false) {
      window.alert(resMyBlogs.data.message)
    }
    const listMyBlogs: dataTableBlogsModel[] = []
    for (const value of resMyBlogs.data.data as IBlogData[]) {
      listMyBlogs.push({
        id: value.id,
        title: value.title,
        category: value.category_name,
        published: value.published_at,
        view: value.view,
      })
    }

    setDataTableBlogs(listMyBlogs)
    setDataTotal(resMyBlogs.data.extra.total)
  }

  const fetchDeleteBlog = async (id: string) => {
    if (window.confirm('Do you want to delete this blog ?')) {
      const resBlog = await deleteBlog(id)

      if (!resBlog.data.success) {
        window.alert(resBlog.data.message)
        navigate('/')
        return
      }
      setDataSnackbar({
        open: true,
        comment: resBlog.data.message ?? 'Success delete blog.',
        severity: 'success',
      })
      await fetchGetMyBlogs()
    }
  }

  useEffect(() => {
    document.title = 'My Blogs'
  }, [])

  useEffect(() => {
    if (dataSearch === '') fetchGetMyBlogs()

    const interval = setInterval(() => {
      if (dataSearch !== dataSearchOld) {
        setDataSearchOld(dataSearch)
        fetchGetMyBlogs()
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
        style={{ fontSize: 21 }}
      />

      <DialogMUI
        open={dataDialog.open}
        close={() => setDataDialog({ ...dataDialog, open: false })}
        type={dataDialog.type}
        label={dataDialog.label}
        onChange={() => { }}
      />

      <Grid item xs={12} md={12}>
        <Stack direction="row" justifyContent="flex-end" alignItems="center">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/my-blogs-create')}
          >
            Create Blog
          </Button>
        </Stack>
      </Grid>

      <Grid item xs={12} md={12}>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <SearchBox onChange={(event: string) => setDataSearch(event)} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={12}>
        <BlogsListTable
          body={dataTableBlogs}
          page={dataPage}
          limit={dataLimit}
          total={dataTotal}
          listLimit={[5, 10, 20]}
          onPageChange={(event: number) => setDataPage(event)}
          onLimitChange={(event: number) => setDataLimit(event)}
          onDeleteClick={(event) => fetchDeleteBlog(event)}
        />
      </Grid>
    </>
  )
}
