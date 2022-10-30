import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useEffect, useState } from 'react'

export interface IAutocomplete {
  id: number | string
  label: number | string
}

interface IAutocompleteMUIProps {
  data: IAutocomplete[]
  title: string
  size: "small" | "medium"
  defaultValue?: IAutocomplete
  onChange: (event: IAutocomplete) => void
  [rest: string]: any
}

export const AutocompleteMUI = (props: IAutocompleteMUIProps) => {
  const [dataValue, setDataValue] = useState<any>('')

  const { data, title, onChange, size, defaultValue, ...rest } = props

  useEffect(() => {
    if (props.hasOwnProperty('defaultValue')) {
      setDataValue(props.defaultValue)
    }
  }, [])

  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        sx={{ w: '100%' }}
        size="small"
        options={props.data}
        renderInput={(params: any) => <TextField {...params} label={props.title} />}
        onChange={(_: any, value: any) => {
          if (!value) {
            setDataValue('')
            return
          }
          if (value.id === -1) {
            setDataValue('')
          }
          setDataValue({ id: value.id, label: value.label })
          props.onChange({ id: value.id, label: value.label })
        }}
        isOptionEqualToValue={(option: IAutocomplete, value: any) => {
          if (typeof value === 'string') {
            return true
          }
          if (option.id === value.id) {
            return true
          }
          return false
        }}
        getOptionLabel={(option: any) => option?.label ?? ''}
        value={dataValue?.id == -1 ? '' : dataValue}
        {...rest}
      />
    </>
  )
}
