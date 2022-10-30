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
import AddIcon from '@mui/icons-material/Add'
import { styled } from '@mui/material/styles'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SearchBox from '../../components/static/SearchBox'
import ViewCategoriesTable from '../../components/tables/ViewCategoriesTable'
import { deleteCategoryById, getCategories } from '../../api'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid, Stack } from '@mui/material'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { fetchGetCategory } from '../../redux/reducer'
import { ISnackbarData, SnackbarData, SnackbarMUI } from '../../components/MUI'

const dummyData = [
  {
    id: 'adasx3xa3',
    category: 'example',
    created_by: 'me',
    published: '10/12/2022',
    description: 'no comment',
  },
  {
    id: 'adasx3xa3',
    category: 'example',
    created_by: 'me',
    published: '10/12/2022',
    description: 'no comment',
  },
  {
    id: 'adasx3xa3',
    category: 'example',
    created_by: 'me',
    published: '10/12/2022',
    description: 'no comment',
  },
  {
    id: 'adasx3xa3',
    category: 'example',
    created_by: 'me',
    published: '10/12/2022',
    description: 'no comment',
  },
  {
    id: 'adasx3xa3',
    category: 'example',
    created_by: 'me',
    published: '10/12/2022',
    description: 'no comment',
  },
  {
    id: 'adasx3xa3',
    category: 'example',
    created_by: 'me',
    published: '10/12/2022',
    description: 'no comment',
  },
  {
    id: 'adasx3xa3',
    category: 'example',
    created_by: 'me',
    published: '10/12/2022',
    description: 'no comment',
  },
  {
    id: 'adasx3xa3',
    category: 'example',
    created_by: 'me',
    published: '10/12/2022',
    description: 'no comment',
  },
  {
    id: 'adasx3xa3',
    category: 'example',
    created_by: 'me',
    published: '10/12/2022',
    description: 'no comment',
  },
  {
    id: 'adasx3xa3',
    category: 'example',
    created_by: 'me',
    published: '10/12/2022',
    description: 'no comment',
  },
]

const theme = createTheme()

const Input = styled('input')({
  display: 'none',
})

export default function ViewCategories(): JSX.Element {
  const [dataSnackbar, setDataSnackbar] = useState<ISnackbarData>(SnackbarData)

  const [dataPage, setDataPage] = useState<number>(0)
  const [dataLimit, setDataLimit] = useState<number>(10)
  const [dataTotal, setDataTotal] = useState<number>(0)

  const [dataSearch, setDataSearch] = useState<string>('')
  const [dataSearchOld, setDataSearchOld] = useState<string>('')

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const dataCategories = useAppSelector((state) => state.categoryReducer)

  useEffect(() => {
    document.title = 'All Blogs'
  }, [])

  const fetchDeleteCategory = async (id: string) => {
    if (window.confirm('Do you want to delete this cateogry ?')) {
      const resCategory = await deleteCategoryById(id)

      if (!resCategory.data.success) {
        window.alert(resCategory.data.message)
        return
      }

      setDataSnackbar({
        open: true,
        comment: resCategory.data.message ?? 'Success delete Category.',
        severity: 'success',
      })

      dispatch(
        fetchGetCategory(
          `?page=${dataPage + 1}&limit=${dataLimit}$keyword=${dataSearch}`
        )
      )
    }
  }

  useEffect(() => {
    if (dataSearch === '') {
      dispatch(
        fetchGetCategory(
          `?page=${dataPage + 1}&limit=${dataLimit}$keyword=${dataSearch}`
        )
      )
    }

    const interval = setInterval(() => {
      if (dataSearch !== dataSearchOld) {
        setDataSearchOld(dataSearch)
        dispatch(
          fetchGetCategory(
            `?page=${dataPage + 1}&limit=${dataLimit}$keyword=${dataSearch}`
          )
        )
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

      <Grid item xs={12} md={12}>
        <Stack direction="row" justifyContent="flex-end" alignItems="center">
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/view-categories-create')}
          >
            Create Category
          </Button>
        </Stack>
      </Grid>

      <Grid item xs={12} md={12}>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <SearchBox onChange={(event: string) => setDataSearch(event)} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={12}>
        <ViewCategoriesTable
          body={dataCategories.data}
          page={dataPage}
          limit={dataLimit}
          total={dataTotal}
          listLimit={[5, 10, 20]}
          onPageChange={(event: number) => setDataPage(event)}
          onLimitChange={(event: number) => setDataLimit(event)}
          onDelete={(event: string) => fetchDeleteCategory(event)}
        />
      </Grid>
    </>
  )
}
