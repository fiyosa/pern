import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

interface IDataTableModel {
  id: string
  label: string
}

interface IDropdownProps {
  datas: IDataTableModel[]
  value: string
  label: string
  size: 'small' | 'medium'
  onChangeProps: (event: string) => void
  [rest: string]: any
}

export default function Dropdown(props: IDropdownProps) {
  const { datas, value, label, size, onChangeProps, ...rest } = props

  const handleChange = (event: SelectChangeEvent) => {
    onChangeProps(event.target.value as string)
  }

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label={label}
          onChange={handleChange}
          size={size}
          {...rest}
        >
          {datas.length > 0 &&
            datas.map((data, index) => (
              <MenuItem key={index} value={data.id}>
                {data.label}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  )
}
