import { MenuItem, Select, FormControl, InputLabel, SelectChangeEvent, } from "@mui/material";
import { useEffect, useState } from "react";

interface IData {
  id: number | string
  label: number | string
}

interface ISelectMUIProps {
  title: string
  size: "small" | "medium"
  data: IData[]
  value?: number | string
  defaultValue?: number | string
  onChange: (event: string) => void
}

export const SelectMUI = (props: ISelectMUIProps) => {
  const [dataValue, setDataValue] = useState<string>('')

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value as string
    props.onChange(value);
    setDataValue(value)
  };

  useEffect(() => {
    if (props.hasOwnProperty('defaultValue')) {
      setDataValue(`${props.defaultValue}`)
    }
  }, [])

  return (
    <>
      <FormControl fullWidth size={props.size}>
        <InputLabel id="demo-simple-select-label">{props.title}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="list-role"
          value={props.hasOwnProperty('value') ? `${props.value}` : dataValue}
          onChange={handleChange}
        >
          {props.data.length > 0 &&
            props.data.map((value, index: number) => (
              <MenuItem key={index} value={`${value.id}`}>
                {value.label}
              </MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </>
  )
}