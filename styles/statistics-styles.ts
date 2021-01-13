import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStylesStatistics = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',

      alignContent: 'center',
      justifyContent: 'center',
      padding: '16px 0px 16px 0px',
      marginBottom: 20,
      width: '100%',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 300,
    },
    button: {
      marginRight: 50,
    },
    buttonTable: {
      margin: theme.spacing(1),
    },
  })
)
