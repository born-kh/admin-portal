import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
    },
    imageButtonLabel: {
      height: 80,
      width: 100,
    },

    paperImage: {
      display: 'flex',

      justifyContent: 'center',
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      height: 400,
    },
    card: {
      display: 'flex',
      justifyContent: 'center',
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      height: 320,
    },
    button: {
      margin: theme.spacing(1),
    },
    media: {
      maxHeight: '100%',
      maxWidth: '100%',
    },
    table: {
      minWidth: 300,
    },
    paperImages: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',

      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    editStepImages: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: theme.spacing(2),
    },
    editButton: {
      marginRight: theme.spacing(1),
      float: 'right',
      width: 150,
    },
    textField: {
      margin: theme.spacing(1),
      width: '30ch',
    },
    editPaperImage: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      height: 456,
    },
  })
)

export default useStyles
