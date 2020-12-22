import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStylesUserManager = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: '16px 40px',
      width: '100%',
    },

    paper: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: '16px 40px',
      marginBottom: 10,
      width: 600,
    },

    paper2: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: '16px 40px',
      width: 340,
      marginBottom: 10,
      marginLeft: 20,
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '30ch',
    },
    button: {
      marginLeft: 400,
    },
    button2: {
      marginLeft: 170,
    },

    buttonTable: {
      margin: theme.spacing(1),
    },
    accountProfile: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      padding: 10,
    },
  })
)
