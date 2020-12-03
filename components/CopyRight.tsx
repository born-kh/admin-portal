import { Typography, Link } from '@material-ui/core'

export default function () {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit"> Admin Portal</Link> {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
