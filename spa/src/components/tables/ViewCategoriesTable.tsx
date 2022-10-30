import { PaginationMUI } from '../../components/MUI'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import { Stack, IconButton, Tooltip } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { ICategoryData } from '../../model'


interface ViewCategoriesTableProps {
  body: ICategoryData[]
  page: number
  limit: number
  total: number
  listLimit: number[]
  onPageChange: (event: number) => void
  onLimitChange: (event: number) => void

  onDelete: (event: string) => void
}

export default function ViewCategoriesTable(
  props: ViewCategoriesTableProps
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
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Created By</TableCell>
                <TableCell align="left">Published</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.body.length > 0 &&
                props.body.map((data: ICategoryData, index: number) => {
                  return (
                    <TableRow key={index} hover>
                      <TableCell align="left">
                        {index +
                          (props.page + 1) * props.limit -
                          (props.limit - 1)}
                      </TableCell>
                      <TableCell align="left">{data.name}</TableCell>
                      <TableCell align="left">{data.user_name}</TableCell>
                      <TableCell align="left">{data.published_at}</TableCell>
                      <TableCell align="left">{data.description}</TableCell>
                      <TableCell align="left">
                        <Stack
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                          spacing={2}
                        >
                          <Tooltip
                            title="edit"
                            placement="top"
                            onClick={() =>
                              navigate(`/view-categories-edit/${data.id}`)
                            }
                          >
                            <IconButton>
                              <EditIcon color="warning" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="delete" placement="top" onClick={() => props.onDelete(data.id)}>
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
