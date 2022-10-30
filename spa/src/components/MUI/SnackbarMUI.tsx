import { Alert, Snackbar } from '@mui/material'
import { SyntheticEvent } from 'react'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

// state management
export interface ISnackbarData {
  open: boolean
  severity: 'error' | 'warning' | 'info' | 'success'
  comment: string
}
export const SnackbarData: ISnackbarData = {
  open: false,
  severity: 'success',
  comment: '',
}

interface ISnackbarMUIProps {
  open: boolean
  close: () => void
  timer: number
  comment: string
  severity: 'error' | 'warning' | 'info' | 'success'
  position: {
    vertical: 'top' | 'bottom'
    horizontal: 'center' | 'right' | 'left'
  }
  iconSize?: 'small' | 'medium' | 'large'
  style?: any
  sx?: any
}

export const SnackbarMUI = (props: ISnackbarMUIProps) => {
  const handleCloseNotif = (
    event?: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }
    props.close()
  }

  return (
    <>
      <Snackbar
        anchorOrigin={props.position}
        autoHideDuration={props.timer}
        open={props.open}
        onClose={handleCloseNotif}
      >
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size={props.hasOwnProperty('iconSize') ? props.iconSize : 'small'}
              onClick={handleCloseNotif}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          severity={props.severity}
          sx={props.sx}
          style={props.style}
        >
          {props.comment}
        </Alert>
      </Snackbar>
    </>
  )
}
