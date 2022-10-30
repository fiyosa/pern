import {
  ListItemText,
  Badge,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  Menu,
  Typography,
} from '@mui/material'
import { MouseEvent, useEffect, useState } from 'react'
import { IMessageData } from '../../model'

interface IMessage {
  data: IMessageData[]
  open: null | HTMLElement
  openRefresh: boolean
  close: () => void
  onRefreshClick: () => void
}

export default function Message(props: IMessage) {
  const [anchorElNotif, setAnchorElNotif] = useState<null | HTMLElement>(null)

  const openNotif = Boolean(anchorElNotif)
  const handleCloseNotif = () => {
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
            minWidth: 300,
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
                <Button
                  sx={{ mx: 'auto' }}
                  variant="outlined"
                  disabled={props.openRefresh}
                  onClick={() => props.onRefreshClick()}
                >
                  Refresh
                </Button>
              </ListItem>
              <Divider />
            </ul>
          </li>
          {props.data.length > 0 &&
            props.data.map((dataNotif, index) => (
              <li key={`item-${index}`}>
                <ul>
                  <ListItem>
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
