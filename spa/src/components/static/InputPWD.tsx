import { Stack, IconButton, Tooltip } from '@mui/material'
import Box from '@mui/material/Box'
import Input from '@mui/material/Input'
import FilledInput from '@mui/material/FilledInput'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import TextField from '@mui/material/TextField'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useState } from 'react'

interface IDataConfigModel {
  showPWD: boolean
}
interface IInputPWDProps {
  data: string
  label: string
  size: 'small' | 'medium'
}
export default function InputPWD(props: IInputPWDProps): JSX.Element {
  const [dataConfig, setDataConfig] = useState<IDataConfigModel>({
    showPWD: false,
  })
  return (
    <>
      <FormControl
        sx={{ m: 1, width: '25ch' }}
        variant="outlined"
        size={props.size}
      >
        <InputLabel htmlFor="outlined-adornment-password">
          {props.label}
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={dataConfig.showPWD ? 'text' : 'password'}
          value={props.data}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() =>
                  setDataConfig({
                    ...dataConfig,
                    showPWD: !dataConfig.showPWD,
                  })
                }
                // onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {dataConfig.showPWD ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Password"
        />
      </FormControl>
    </>
  )
}
