import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material'
import { ChangeEvent, MouseEvent, useState } from 'react'

interface State {
  password: string
  showPassword: boolean
}

interface ITextFieldPwdMUIProps {
  size: 'small' | 'medium'
  label: string
  value?: string
  onChange?: (event: string) => void
  sx?: any
  [rest: string]: any
}

export const TextFieldPwdMUI = (props: ITextFieldPwdMUIProps) => {
  const { size, label, value, onChange, sx, ...rest } = props

  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false,
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (props.hasOwnProperty('onChange')) {
      if (props.onChange)
        props.onChange(event.target?.value || '')
    }
    setValues({
      ...values,
      password: event.target.value,
    })
  }

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    })
  }

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <>
      <FormControl sx={props.sx} variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">
          {props.label}
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={values.showPassword ? 'text' : 'password'}
          value={props.hasOwnProperty('value') ? props.value : values.password}
          onChange={handleChange}
          size={props.size}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          {...rest}
        />
      </FormControl>
    </>
  )
}
