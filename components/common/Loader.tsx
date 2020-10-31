import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: 'auto',
      display: 'flex',
      alignContent: 'center',
      justifyContent: 'center',
    },
  })
)

export default function Loader({ size = 100 }: { size?: number }) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <CircularProgress size={size} />
    </div>
  )
}
