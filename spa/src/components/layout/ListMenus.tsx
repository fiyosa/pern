import { Fragment, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListSubheader from '@mui/material/ListSubheader'
import DashboardIcon from '@mui/icons-material/Dashboard'
import LoginIcon from '@mui/icons-material/Login'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import InfoIcon from '@mui/icons-material/Info'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import { Divider } from '@mui/material'
import { IMenuRoute } from '../../model'
import { useAppSelector } from '../../redux/hooks'

interface listMenuProps {
  label: string
  icon: ReactNode
  link: string
}

export default function ListMenus() {
  const dataMenus = useAppSelector((state) => state.menuReducer)

  const ListMenu = (props: listMenuProps): JSX.Element => {
    const navigate = useNavigate()
    return (
      <>
        <ListItemButton onClick={() => navigate(props.link)}>
          <ListItemIcon>{props.icon}</ListItemIcon>
          <ListItemText primary={props.label} />
        </ListItemButton>
      </>
    )
  }

  return (
    <>
      {/* Menu Public */}
      <Fragment>
        {dataMenus.data.Public.map((value: IMenuRoute, index: number) => {
          switch (value.route_name) {
            case 'dashboard':
              return (
                <ListMenu
                  key={index}
                  label="Dashboard"
                  link="/"
                  icon={<DashboardIcon />}
                />
              )
            case 'blogs':
              return (
                <ListMenu
                  key={index}
                  label="Blogs"
                  link="/blogs"
                  icon={<LibraryBooksIcon />}
                />
              )
            case 'about':
              return (
                <ListMenu
                  key={index}
                  label="About"
                  link="/about"
                  icon={<InfoIcon />}
                />
              )
            case 'sign_in':
              return (
                <ListMenu
                  key={index}
                  label="Sign In"
                  link="/signin"
                  icon={<LoginIcon />}
                />
              )
          }
        })}
      </Fragment>

      {/* Menu User */}
      {dataMenus.data.User.length > 0 && (
        <>
          <Fragment>
            <Divider sx={{ my: 1 }} />
            <ListSubheader component="div" inset>
              User
            </ListSubheader>
            {dataMenus.data.User.map((value: IMenuRoute, index: number) => {
              switch (value.route_name) {
                case 'my_blogs':
                  return (
                    <ListMenu
                      key={index}
                      label="My Blogs"
                      link="/my-blogs"
                      icon={<AutoFixHighIcon />}
                    />
                  )
              }
            })}
          </Fragment>
        </>
      )}

      {/* Menu Admin */}
      {dataMenus.data.Admin.length > 0 && (
        <>
          <Divider sx={{ my: 1 }} />
          <Fragment>
            <ListSubheader component="div" inset>
              Admin
            </ListSubheader>
            {dataMenus.data.Admin.map((value: IMenuRoute, index: number) => {
              switch (value.route_name) {
                case 'view_user':
                  return (
                    <ListMenu
                      key={index}
                      label="View Users"
                      link="/view-users"
                      icon={<PeopleAltIcon />}
                    />
                  )
                case 'view_blogs':
                  return (
                    <ListMenu
                      key={index}
                      label="View Blogs"
                      link="/view-blogs"
                      icon={<LibraryBooksIcon />}
                    />
                  )
                case 'view_categories':
                  return (
                    <ListMenu
                      key={index}
                      label="View Categories"
                      link="/view-categories"
                      icon={<FormatListBulletedIcon />}
                    />
                  )
              }
            })}
          </Fragment>
        </>
      )}
    </>
  )
}
