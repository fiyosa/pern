import { useEffect, useState } from 'react'
import { Grid, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import SearchBox from '../../components/static/SearchBox'
import BlogsViewTable from '../../components/tables/BlogsViewTable'
import {
  deleteBlog,
  deleteMessageById,
  getBlogsAuth,
  getBlogsPublic,
  postMessage,
} from '../../api'
import {
  BackdropMUI,
  ISnackbarData,
  SnackbarData,
  SnackbarMUI,
} from '../../components/MUI'
import { IBlogData } from '../../model'

interface messageModel {
  id: string
  description: string
  date: string
}

export default function ViewBlogs() {
  const [loading, setLoading] = useState<boolean>(false)
  const [dataSnackbar, setDataSnackbar] = useState<ISnackbarData>(SnackbarData)

  const [dataPage, setDataPage] = useState<number>(0)
  const [dataLimit, setDataLimit] = useState<number>(10)
  const [dataTotal, setDataTotal] = useState<number>(0)

  const [dataSearch, setDataSearch] = useState<string>('')
  const [dataSearchOld, setDataSearchOld] = useState<string>('')

  const [dataTableBlogs, setDataTableBlogs] = useState<IBlogData[]>([])

  const navigate = useNavigate()

  const fetchGetBlogs = async () => {
    const url: string = `?type=admin&page=${dataPage + 1}&limit=${dataLimit}${dataSearch !== '' ? `&keyword=${dataSearch}` : ''
      }`
    const resBlogs = await getBlogsAuth(url)

    if (resBlogs.status !== 200) {
      setDataSnackbar({
        open: true,
        comment: 'Failed get data blogs.',
        severity: 'error',
      })
    }

    setDataTableBlogs(resBlogs.data.data as IBlogData[])
    setDataTotal(resBlogs.data.extra.total)
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
      await fetchGetBlogs()
    }
  }

  const fetchPostMessage = async (props: {
    user_id: string
    description: string
  }) => {
    setLoading(true)
    const resMessage = await postMessage({
      user_id: props.user_id,
      description: props.description,
    })

    if (resMessage.status !== 200) {
      setLoading(false)
      setDataSnackbar({
        open: true,
        comment: resMessage.data.message ?? 'Failed send message.',
        severity: 'error',
      })
      return
    }

    setDataTableBlogs([])
    await fetchGetBlogs()

    setLoading(false)
    setDataSnackbar({
      open: true,
      comment: resMessage.data.message ?? 'Success send message.',
      severity: 'success',
    })
  }

  const fetchDeleteMessage = async (id: string) => {
    setLoading(true)
    const resMessage = await deleteMessageById(id)

    if (resMessage.status !== 200) {
      setLoading(false)
      setDataSnackbar({
        open: true,
        comment: resMessage.data.message ?? 'Failed delete message.',
        severity: 'error',
      })
      return
    }

    setDataTableBlogs([])
    await fetchGetBlogs()

    setLoading(false)
    setDataSnackbar({
      open: true,
      comment: resMessage.data.message ?? 'Success delete message.',
      severity: 'success',
    })
  }

  useEffect(() => {
    document.title = 'View Blogs'
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
      <BackdropMUI open={loading} />
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

      <Grid item xs={12} md={12}>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <SearchBox onChange={(event: string) => setDataSearch(event)} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={12}>
        <BlogsViewTable
          body={dataTableBlogs}
          page={dataPage}
          limit={dataLimit}
          total={dataTotal}
          listLimit={[5, 10, 20]}
          onPageChange={(event: number) => setDataPage(event)}
          onLimitChange={(event: number) => setDataLimit(event)}
          onDeleteBlog={(event) => fetchDeleteBlog(event)}
          onSendMessage={(event) => fetchPostMessage(event)}
          onDeleteMessage={(event) => fetchDeleteMessage(event)}
        />
      </Grid>
    </>
  )
}
