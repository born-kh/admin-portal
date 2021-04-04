import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
)

export default function Loader({ size = 50, height }: { size?: number; height?: string }) {
  const classes = useStyles()
  if (height) {
    return <CircularProgress size={size} />
  }

  return (
    <div className={classes.root}>
      <CircularProgress size={size} />
    </div>
  )
}
