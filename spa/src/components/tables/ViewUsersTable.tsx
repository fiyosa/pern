import { PaginationMUI, SelectMUI } from '../../components/MUI'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Stack, IconButton, Tooltip } from '@mui/material'
import { MouseEvent, useState } from 'react'
import MessageIcon from '@mui/icons-material/Message'
import Message from '../static/Message'
import { IMessageData, IRoleData, IUserData, IUserDataBlog } from '../../model'

const formatRole = (data: IRoleData[]): any[] => {
  const newData: { id: string; label: string }[] = []
  for (const value of data) {
    if (value.name !== 'Public') {
      newData.push({
        id: value.id,
        label: value.name,
      })
    }
  }
  return newData
}

const formatView = (data: IUserDataBlog[]): number => {
  let totalView: number = 0
  for (const value of data) {
    totalView += value.view
  }
  return totalView
}

interface dataConfigModel {
  messageData: IMessageData[]
  email: string
  userId: string
}

interface IViewUsersTableProps {
  body: IUserData[]
  role: IRoleData[]
  page: number
  limit: number
  total: number
  listLimit: number[]
  changePage: (event: number) => void
  changeLimit: (event: number) => void
  onRoleChange: (event: { user_id: string; role_id: string }) => void
  onSendMessage: (event: { user_id: string; description: string }) => void
  onDeleteMessage: (event: string) => void
  onDeleteUser: (id: string, email: string) => void
}

export default function ViewUsersTable(
  props: IViewUsersTableProps
): JSX.Element {
  const [dataConfig, setDataConfig] = useState<dataConfigModel>({
    messageData: [],
    email: '-',
    userId: '',
  })
  const [anchorElNotif, setAnchorElNotif] = useState<null | HTMLElement>(null)

  const handleClickNotif = (
    event: MouseEvent<HTMLButtonElement>,
    data: IMessageData[],
    email: string,
    userId: string
  ) => {
    setAnchorElNotif(event.currentTarget)
    setDataConfig({ messageData: data, email, userId })
  }

  return (
    <>
      <Message
        open={anchorElNotif}
        close={() => setAnchorElNotif(null)}
        data={dataConfig.messageData}
        email={dataConfig.email}
        userId={dataConfig.userId}
        onSendMessage={(event) => props.onSendMessage(event)}
        onDeleteMessage={(event) => props.onDeleteMessage(event)}
      />

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ minWidth: 5 }}>
                  No
                </TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Author</TableCell>
                <TableCell align="center">Total Blogs</TableCell>
                <TableCell align="center">View</TableCell>
                <TableCell align="left">Role</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.body.length > 0 &&
                props.role.length > 0 &&
                props.body.map((data, index: number) => {
                  return (
                    <TableRow key={index} hover>
                      <TableCell align="left">
                        {index +
                          (props.page + 1) * props.limit -
                          (props.limit - 1)}
                      </TableCell>
                      <TableCell align="left">{data.email}</TableCell>
                      <TableCell align="left">
                        {data.first_name + ' ' + data.last_name}
                      </TableCell>
                      <TableCell align="center">{data.blog.length}</TableCell>
                      <TableCell align="center">
                        {formatView(data.blog)}
                      </TableCell>
                      <TableCell align="left">
                        {props.role.length > 0 && (
                          <SelectMUI
                            title={''}
                            size={'small'}
                            data={formatRole(props.role)}
                            defaultValue={data.role_id}
                            onChange={(event: string) =>
                              props.onRoleChange({
                                user_id: data.id,
                                role_id: event,
                              })
                            }
                          />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        {/* MEssage */}
                        <Tooltip title="Message" placement="top">
                          <IconButton
                            onClick={(event: MouseEvent<HTMLButtonElement>) =>
                              handleClickNotif(
                                event,
                                data.message,
                                data.email,
                                data.id
                              )
                            }
                          >
                            <MessageIcon color="primary" />
                          </IconButton>
                        </Tooltip>

                        {/* Delete */}
                        <Tooltip title="delete" placement="top">
                          <IconButton
                            onClick={() =>
                              props.onDeleteUser(data.id, data.email)
                            }
                          >
                            <DeleteForeverIcon color="error" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack direction="row" justifyContent="flex-end" alignItems="center">
          <PaginationMUI
            page={props.page}
            limit={props.limit}
            total={props.total}
            listLimit={props.listLimit}
            onPageChange={(event: number) => props.changePage(event)}
            onLimitChange={(event: number) => props.changeLimit(event)}
          />
        </Stack>
      </Paper>
    </>
  )
}
