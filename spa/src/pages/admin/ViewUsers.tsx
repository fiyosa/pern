import { useEffect, useState } from 'react'
import { Grid, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import SearchBox from '../../components/static/SearchBox'
import ViewUsersTable from '../../components/tables/ViewUsersTable'
import { IRoleData, IUserData } from '../../model'
import {
  deleteMessageById,
  deleteUserById,
  getRoles,
  getUsers,
  postMessage,
  putUserRole,
} from '../../api'
import {
  BackdropMUI,
  ISnackbarData,
  SnackbarData,
  SnackbarMUI,
} from '../../components/MUI'

export default function ViewUsers() {
  const [loading, setLoading] = useState<boolean>(false)
  const [dataSnackbar, setDataSnackbar] = useState<ISnackbarData>(SnackbarData)

  const [ViewUsers, setViewUsers] = useState<IUserData[]>([])
  const [ViewRoles, setViewRoles] = useState<IRoleData[]>([])

  const [dataPage, setDataPage] = useState<number>(0)
  const [dataLimit, setDataLimit] = useState<number>(10)
  const [dataTotal, setDataTotal] = useState<number>(0)

  const [dataSearch, setDataSearch] = useState<string>('')
  const [dataSearchOld, setDataSearchOld] = useState<string>('')

  const navigate = useNavigate()

  const fetchGetUsers = async () => {
    const resUsers = await getUsers(
      `?page=${dataPage + 1}&limit=${dataLimit}&keyword=${dataSearch}`
    )

    if (resUsers.status !== 200) {
      window.alert(resUsers.data.message ?? 'Failed get data users')
      navigate('/')
      return
    }

    setViewUsers(resUsers.data!.data as IUserData[])
    setDataTotal(resUsers.data.data!.length)
  }

  const fetchGetRoles = async () => {
    const resRoles = await getRoles()

    if (resRoles.status !== 200) {
      window.alert(resRoles.data.message ?? 'Failed get data roles')
      navigate('/')
      return
    }

    setViewRoles(resRoles.data.data as IRoleData[])
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

    setViewUsers([])
    await fetchGetUsers()

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

    setViewUsers([])
    await fetchGetUsers()

    setLoading(false)
    setDataSnackbar({
      open: true,
      comment: resMessage.data.message ?? 'Success delete message.',
      severity: 'success',
    })
  }

  const fetchDeleteUser = async (id: string, email: string) => {
    if (window.confirm(`Do you want to delete this account : \n-> ${email}`)) {
      setLoading(true)
      const resMessage = await deleteUserById(id)

      if (resMessage.status !== 200) {
        setLoading(false)
        setDataSnackbar({
          open: true,
          comment: resMessage.data.message ?? 'Failed delete user.',
          severity: 'error',
        })
        return
      }

      setViewUsers([])
      await fetchGetUsers()

      setLoading(false)
      setDataSnackbar({
        open: true,
        comment: resMessage.data.message ?? 'Success delete user.',
        severity: 'success',
      })
    }
  }

  const fetchPutEditRole = async (props: {
    user_id: string
    role_id: string
  }) => {
    setLoading(true)
    const resUserRole = await putUserRole({
      user_id: props.user_id,
      role_id: props.role_id,
    })

    if (resUserRole.status !== 200) {
      setLoading(false)
      setDataSnackbar({
        open: true,
        comment: resUserRole.data.message ?? 'Failed edit role.',
        severity: 'error',
      })
      return
    }

    setViewUsers([])
    await fetchGetUsers()

    setLoading(false)
    setDataSnackbar({
      open: true,
      comment: resUserRole.data.message ?? 'Success edit role.',
      severity: 'success',
    })
  }

  useEffect(() => {
    document.title = 'View Users'
  }, [])

  useEffect(() => {
    if (dataSearch === '') {
      fetchGetUsers()
      fetchGetRoles()
    }

    const interval = setInterval(() => {
      if (dataSearch !== dataSearchOld) {
        setDataSearchOld(dataSearch)
        fetchGetUsers()
        fetchGetRoles()
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
        <ViewUsersTable
          body={ViewUsers}
          role={ViewRoles}
          page={dataPage}
          limit={dataLimit}
          total={dataTotal}
          listLimit={[5, 10, 20]}
          changePage={(event: number) => setDataPage(event)}
          changeLimit={(event: number) => setDataLimit(event)}
          onRoleChange={(event) => fetchPutEditRole(event)}
          onSendMessage={(event) => fetchPostMessage(event)}
          onDeleteMessage={(event) => fetchDeleteMessage(event)}
          onDeleteUser={fetchDeleteUser}
        />
      </Grid>
    </>
  )
}
