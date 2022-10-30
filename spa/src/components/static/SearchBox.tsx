import SearchIcon from '@mui/icons-material/Search'
import { InputBase } from '@mui/material'
import { styled, alpha } from '@mui/material/styles'
import { ChangeEvent } from 'react'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  border: 1,
  marginRight: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    width: '95%',
  },
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}))

interface ISearchBoxProps {
  onChange: (event: string) => void
}

export default function SearchBox(props: ISearchBoxProps): JSX.Element {
  return (
    <>
      <Search
        sx={{ border: 1, borderColor: '#d2d2d2', backgroundColor: '#fff' }}
      >
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          sx={{ width: '100%' }}
          placeholder="Search…"
          name="search"
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            props.onChange(event.target.value as string)
          }
          inputProps={{ 'aria-label': 'search' }}
          autoComplete="off"
        />
      </Search>
    </>
  )
}
