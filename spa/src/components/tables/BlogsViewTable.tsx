import { PaginationMUI } from '../../components/MUI'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import { Stack, IconButton, Tooltip } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Message from '../static/Message'
import MessageIcon from '@mui/icons-material/Message'
import { MouseEvent, useState } from 'react'
import { IBlogData, IMessageData } from '../../model'

// interface messageModel {
//   id: string
//   description: string
//   date: string
// }
// interface dataTable {
//   id: string
//   email: string
//   author: string
//   title: string
//   category: string
//   published: string
//   message: messageModel[]
// }

interface BlogsViewTableProps {
  body: IBlogData[]
  page: number
  limit: number
  total: number
  listLimit: number[]
  onPageChange: (event: number) => void
  onLimitChange: (event: number) => void
  onDeleteBlog: (event: string) => void
  onSendMessage: (event: { user_id: string; description: string }) => void
  onDeleteMessage: (event: string) => void
}

interface dataConfigModel {
  messageData: IMessageData[]
  email: string
  userId: string
}

export default function BlogsViewTable(
  props: BlogsViewTableProps
): JSX.Element {
  const [dataConfig, setDataConfig] = useState<dataConfigModel>({
    messageData: [],
    email: '',
    userId: '',
  })
  const [anchorElNotif, setAnchorElNotif] = useState<null | HTMLElement>(null)

  const navigate = useNavigate()

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
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Published</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.body.length > 0 &&
                props.body.map((data: IBlogData, index: number) => {
                  return (
                    <TableRow key={index} hover>
                      <TableCell align="left">
                        {index +
                          (props.page + 1) * props.limit -
                          (props.limit - 1)}
                      </TableCell>
                      <TableCell align="left">{data.user_email}</TableCell>
                      <TableCell align="left">{`${data.user_first_name} ${data.user_last_name}`}</TableCell>
                      <TableCell align="left">{data.title}</TableCell>
                      <TableCell align="left">{data.category_name}</TableCell>
                      <TableCell align="left">{data.published_at}</TableCell>
                      <TableCell align="left">
                        <Stack
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          spacing={2}
                        >
                          <Tooltip
                            title="view"
                            placement="top"
                            onClick={() => navigate(`/view-blogs/${data.id}`)}
                          >
                            <IconButton>
                              <RemoveRedEyeIcon color="primary" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip
                            title="edit"
                            placement="top"
                            onClick={() =>
                              navigate(`/view-blogs-edit/${data.id}`)
                            }
                          >
                            <IconButton>
                              <EditIcon color="warning" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Message" placement="top">
                            <IconButton
                              onClick={(event: MouseEvent<HTMLButtonElement>) =>
                                handleClickNotif(
                                  event,
                                  data.message as IMessageData[],
                                  data.user_email,
                                  data.user_id
                                )
                              }
                            >
                              <MessageIcon color="primary" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip
                            title="delete"
                            placement="top"
                            onClick={() => props.onDeleteBlog(data.id)}
                          >
                            <IconButton>
                              <DeleteForeverIcon color="error" />
                            </IconButton>
                          </Tooltip>
                        </Stack>
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
            onPageChange={(event: number) => props.onPageChange(event)}
            onLimitChange={(event: number) => props.onLimitChange(event)}
          />
        </Stack>
      </Paper>
    </>
  )
}
