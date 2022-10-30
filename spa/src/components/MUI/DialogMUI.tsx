import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'

export interface IDialog {
  open: boolean
  type: 'alert' | 'confirm'
  label: string
}

interface IDialogMUI {
  open: boolean
  close: () => void
  type: 'alert' | 'confirm'
  label: string
  onChange: (type: 'alert' | 'confirm', event: boolean) => void
}

export const DialogMUI = (props: IDialogMUI) => {
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>
    },
    ref: React.Ref<unknown>
  ) {
    return <Slide direction="up" ref={ref} {...props} />
  })

  const handleCancel = () => {
    props.onChange(props.type, false)
    props.close()
  }

  const handleOke = () => {
    props.onChange(props.type, true)
    props.close()
  }

  return (
    <>
      <Dialog
        open={props.open}
        TransitionComponent={Transition}
        keepMounted
        // onClose={handleCancel}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {props.type === 'alert' ? 'Alert' : 'Confirm'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props.label}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {props.type === 'alert' ? (
            <Button onClick={handleOke}>Oke</Button>
          ) : (
            <>
              <Button onClick={handleOke}>Oke</Button>
              <Button onClick={handleCancel}>Cancel</Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}
