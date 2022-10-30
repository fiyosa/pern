import { MouseEvent, useEffect, useState } from 'react'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import MuiDrawer from '@mui/material/Drawer'
import Box from '@mui/material/Box'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Badge from '@mui/material/Badge'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Outlet, useNavigate } from 'react-router-dom'
import { deepOrange } from '@mui/material/colors'
import { Avatar, Button, ListItem, ListItemText, Paper } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import Tooltip from '@mui/material/Tooltip'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import LogoutIcon from '@mui/icons-material/Logout'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import ImgBackground from '../../assets/resource/img-screen-main.webp'
import ListMenus from './ListMenus'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  categoryReducerReset,
  fetchGetCategory,
  fetchGetMenusAuth,
  fetchGetMenusPublic,
  fetchGetUserAccount,
  userReducerReset,
} from '../../redux/reducer'
import {
  getCheck,
  getLogout,
  getMessageAccount,
  getMessageReadAccount,
} from '../../api'
import { BackdropMUI } from '../MUI'
import Message from './Message'
import { IMessageData } from '../../model'

const dummyNotif = [
  {
    id: 'asd123',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus accusantium neque error saepe aut deserunt ea dicta totam eos quis?',
    date: '10/12/2022',
  },
  {
    id: 'asd123',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus accusantium neque error saepe aut deserunt ea dicta totam eos quis?',
    date: '10/12/2022',
  },
  {
    id: 'asd123',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus accusantium neque error saepe aut deserunt ea dicta totam eos quis?',
    date: '10/12/2022',
  },
  {
    id: 'asd123',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus accusantium neque error saepe aut deserunt ea dicta totam eos quis?',
    date: '10/12/2022',
  },
  {
    id: 'asd123',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus accusantium neque error saepe aut deserunt ea dicta totam eos quis?',
    date: '10/12/2022',
  },
  {
    id: 'asd123',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus accusantium neque error saepe aut deserunt ea dicta totam eos quis?',
    date: '10/12/2022',
  },
  {
    id: 'asd123',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus accusantium neque error saepe aut deserunt ea dicta totam eos quis?',
    date: '10/12/2022',
  },
  {
    id: 'asd123',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus accusantium neque error saepe aut deserunt ea dicta totam eos quis?',
    date: '10/12/2022',
  },
]

function Copyright() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ pt: 4 }}
    >
      {'Copyright © '}
      Fiyosa {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const drawerWidth: number = 240

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paper': {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: 'border-box',
    ...(!open && {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    }),
  },
}))

const mdTheme = createTheme()

export default function Layout() {
  const [loading, setLoading] = useState<boolean>(true)

  const [listMessage, setListMessage] = useState<IMessageData[]>([])
  const [UnReadMessage, setUnReadMessage] = useState<number>(0)
  const [openButtonMessage, setOpenButtonMessage] = useState<boolean>(false)

  const [open, setOpen] = useState<boolean>(false)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [anchorElNotif, setAnchorElNotif] = useState<null | HTMLElement>(null)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const dataUser = useAppSelector((state) => state.userReducer)
  const dataMenu = useAppSelector((state) => state.menuReducer)

  const initSignin = () => {
    dispatch(fetchGetMenusAuth())
    dispatch(fetchGetUserAccount())
    dispatch(fetchGetCategory(''))
    fetchGetMessages()
  }

  const initSignout = () => {
    dispatch(fetchGetMenusPublic())
    dispatch(userReducerReset())
    dispatch(categoryReducerReset())
  }

  const handleClickNotif = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorElNotif(event.currentTarget)
    fetchGetReadMessages()
  }

  const fetchGetMessages = async () => {
    const resMessage = await getMessageAccount()

    if (resMessage.status !== 200) {
      window.alert('Failed Get data message.')
      return
    }

    let countUnRead: number = 0
    for (const value of resMessage.data!.data as IMessageData[]) {
      if (value.is_view === 0) {
        countUnRead += 1
      }
    }

    setUnReadMessage(countUnRead)
    setListMessage(resMessage.data.data as IMessageData[])
  }

  const fetchGetReadMessages = async () => {
    const resMessage = await getMessageReadAccount()

    if (resMessage.status !== 200) {
      window.alert('Failed update data message.')
      return
    }

    setUnReadMessage(0)
  }

  useEffect(() => {
    if (window.localStorage.getItem('token') === null) {
      dispatch(fetchGetMenusPublic())
    } else {
      ; (async () => {
        const check = await getCheck()
        if (check.data?.success === false) {
          window.localStorage.removeItem('token')
          dispatch(fetchGetMenusPublic())
        } else {
          initSignin()
        }
      })()
    }
  }, [])

  useEffect(() => {
    if (dataMenu.loading || dataUser.loading) {
      setLoading(true)
    } else {
      setLoading(false)
    }
  }, [dataMenu, dataUser])

  const toggleDrawer = () => {
    setOpen(!open)
  }

  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleSignOut = async () => {
    setLoading(true)
    setAnchorElUser(null)
    window.localStorage.removeItem('token')
    await getLogout()
    initSignout()
    setLoading(false)
    navigate('/')
  }

  return (
    <>
      <BackdropMUI open={loading} />

      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: '24px', // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                {''}
              </Typography>
              {dataUser.data.email !== '' && (
                <>
                  {/* Menu Message */}
                  <IconButton color="inherit" onClick={handleClickNotif}>
                    <Badge badgeContent={UnReadMessage} color="secondary">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <Message
                    data={listMessage}
                    open={anchorElNotif}
                    close={() => setAnchorElNotif(null)}
                    openRefresh={openButtonMessage}
                    onRefreshClick={async () => {
                      setOpenButtonMessage(true)
                      await fetchGetReadMessages()
                      await fetchGetMessages()
                      setOpenButtonMessage(false)
                    }}
                  />

                  {/* Menu Account */}
                  <Box sx={{ ml: 2, flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar sx={{ bgcolor: deepOrange[500] }}>
                          {dataUser.data?.first_name[0]}
                          {dataUser.data?.last_name[0]}
                        </Avatar>
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: '45px' }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem
                        key={`menu-${1}`}
                        disableRipple
                        onClick={() => navigate('profile')}
                      >
                        <PermIdentityIcon />
                        Profile
                      </MenuItem>
                      <Divider sx={{ my: 0.5 }} />
                      <MenuItem
                        key={`menu-${2}`}
                        disableRipple
                        onClick={handleSignOut}
                      >
                        <LogoutIcon />
                        Logout
                      </MenuItem>
                    </Menu>
                  </Box>
                </>
              )}
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: [1],
                cursor: 'pointer',
              }}
              onClick={toggleDrawer}
            >
              <Box></Box>
              <Typography variant="h5" gutterBottom component="div">
                Menu
              </Typography>
              <IconButton>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List component="nav">
              <ListMenus />
            </List>
          </Drawer>
          <Paper
            component="main"
            style={{
              backgroundImage: `url(${ImgBackground})`,
            }}
            sx={{
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Grid container spacing={3}>
                <Outlet />
              </Grid>
              <Copyright />
            </Container>
          </Paper>
        </Box>
      </ThemeProvider>
    </>
  )
}
