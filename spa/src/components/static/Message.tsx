import {
  Button,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Stack,
  Tooltip,
  IconButton,
  Typography,
} from '@mui/material'
import List from '@mui/material/List'
import Menu from '@mui/material/Menu'
import { ChangeEvent, useEffect, useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { IMessageData } from '../../model'

interface IMessageProps {
  data: IMessageData[]
  open: null | HTMLElement
  close: () => void
  email: string
  userId: string
  onSendMessage: (event: { user_id: string; description: string }) => void
  onDeleteMessage: (event: string) => void
}

export default function Message(props: IMessageProps) {
  const [anchorElNotif, setAnchorElNotif] = useState<null | HTMLElement>(null)

  const [dataDescription, setDataDescription] = useState<string>('')

  const openNotif = Boolean(anchorElNotif)

  const handleCloseNotif = () => {
    setDataDescription('')
    setAnchorElNotif(null)
    props.close()
  }

  useEffect(() => {
    setAnchorElNotif(props.open)
  }, [props])

  return (
    <>
      <Menu
        id="basic-menu"
        anchorEl={anchorElNotif}
        open={openNotif}
        onClose={handleCloseNotif}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <List
          sx={{
            width: '100%',
            maxWidth: 360,
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 300,
            '& ul': { padding: 0 },
          }}
          subheader={<li />}
        >
          <li key={`item-${0}`}>
            <ul>
              <ListItem>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                  sx={{ width: '100%' }}
                >
                  <TextField
                    id="outlined-basic"
                    label=""
                    autoFocus
                    variant="outlined"
                    sx={{ width: '100%' }}
                    autoComplete="off"
                    placeholder="What's wrong ??"
                    onChange={(event: ChangeEvent<HTMLInputElement>) => {
                      console.log(event.target.value);

                      setDataDescription(event.target.value)
                    }}
                  />
                  <Button
                    sx={{ width: '100%' }}
                    variant="contained"
                    disabled={dataDescription !== '' ? false : true}
                    onClick={() => {
                      setAnchorElNotif(null)
                      props.close()
                      props.onSendMessage({
                        user_id: props.userId,
                        description: dataDescription,
                      })
                      setDataDescription('')
                    }}
                  >
                    send to {props.email}
                  </Button>
                </Stack>
              </ListItem>
              <Divider />
            </ul>
          </li>
          {props.data.length > 0 &&
            props.data.map((dataNotif, index: number) => (
              <li key={`item-${index + 1}`}>
                <ul>
                  <ListItem>
                    <Tooltip title="Delete Message" placement="top">
                      <IconButton
                        onClick={() => {
                          props.close()
                          props.onDeleteMessage(dataNotif.id)
                        }}
                      >
                        <DeleteForeverIcon
                          color="error"
                          sx={{ mr: 1, cursor: 'pointer' }}
                        />
                      </IconButton>
                    </Tooltip>
                    <ListItemText primary={`${dataNotif.description}`} />
                  </ListItem>
                  <Typography
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      mr: 2,
                    }}
                  >
                    {dataNotif.published_at}
                  </Typography>
                  <Divider />
                </ul>
              </li>
            ))}
        </List>
      </Menu>
    </>
  )
}
