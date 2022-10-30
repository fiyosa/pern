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

interface dataTable {
  id: string
  title: string
  category: string
  published: string
  view: number
}

interface BlogsListTableprops {
  body: dataTable[]
  page: number
  limit: number
  total: number
  listLimit: number[]
  onPageChange: (event: number) => void
  onLimitChange: (event: number) => void

  onDeleteClick: (event: string) => void
}

export default function BlogsListTable(
  props: BlogsListTableprops
): JSX.Element {
  const navigate = useNavigate()

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="left" style={{ minWidth: 5 }}>
                  No
                </TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Published</TableCell>
                <TableCell align="left">View</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.body.length > 0 &&
                props.body.map((data: dataTable, index: number) => {
                  return (
                    <TableRow key={index} hover>
                      <TableCell align="left">
                        {index +
                          (props.page + 1) * props.limit -
                          (props.limit - 1)}
                      </TableCell>
                      <TableCell align="left">{data.title}</TableCell>
                      <TableCell align="left">{data.category}</TableCell>
                      <TableCell align="left">{data.published}</TableCell>
                      <TableCell align="left">{data.view}</TableCell>
                      <TableCell align="left">
                        <Stack
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          spacing={2}
                        >
                          <Tooltip title="view" placement="top">
                            <IconButton
                              onClick={() => navigate(`/my-blogs/${data.id}`)}
                            >
                              <RemoveRedEyeIcon color="primary" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="edit" placement="top">
                            <IconButton
                              onClick={() =>
                                navigate(`/my-blogs-edit/${data.id}`)
                              }
                            >
                              <EditIcon color="warning" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="delete" placement="top">
                            <IconButton
                              onClick={() => props.onDeleteClick(data.id)}
                            >
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
