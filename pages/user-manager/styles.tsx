import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: '16px 40px',
      width: 600,
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '30ch',
    },
    button: {
      marginLeft: 400,
    },
    buttonTable: {
      margin: theme.spacing(1),
    },
    accountProfile: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
  })
)
