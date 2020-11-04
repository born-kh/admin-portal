import { Typography, Link } from '@material-ui/core'

export default function () {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit">{process.env.NEXT_PUBLIC_APP_NAME} Admin</Link> {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
