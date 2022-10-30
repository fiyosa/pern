import { Backdrop, CircularProgress } from "@mui/material";

interface BackdropMUIProps {
  open: boolean
}
export const BackdropMUI = (props: BackdropMUIProps) => {
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={props.open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  )
}