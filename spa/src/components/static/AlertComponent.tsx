import { Alert } from '@mui/material'

interface IAlertComponentProps {
  severity: 'error' | 'warning' | 'info' | 'success'
  label: string
  [rest: string]: any
}

export default function AlertComponent(
  props: IAlertComponentProps
): JSX.Element {
  const { severity, label, ...rest } = props
  return (
    <>
      <Alert severity={props.severity} {...rest}>
        {props.label}
      </Alert>
    </>
  )
}
