import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStylesDocumentManger = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: 20,
      width: 550,
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    formControl: {
      width: 250,
    },
    button: {
      marginLeft: 400,
    },
    buttonDocument: {
      marginRight: theme.spacing(1),
    },
    buttonTable: {
      margin: theme.spacing(1),
    },
  })
)
