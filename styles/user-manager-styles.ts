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

export const JsonViewerStyles = {
  dualView: {
    display: 'flex',
    backgroundColor: 'black',
  },
  jsonViewer: {
    borderLeft: '1px dashed white',
    width: '40%',
    margin: 5,
    lineHeight: 1.25,
  },
  jsonEditor: {
    width: '60%',
    fontSize: 12,
    fontFamily: 'Lucida Console, monospace',
    margin: 5,
    lineHeight: 1.25,
  },
  root: {
    fontSize: 12,
    margin: 5,
    fontFamily: 'Lucida Console, monospace',
    backgroundColor: 'black',
    lineHeight: 1.25,
    /*color: "#3E3D32"*/
  },
  label: {
    color: 'DeepPink',
    marginTop: 3,
  },
  value: {
    marginLeft: 10,
  },
  row: {
    display: 'flex',
  },
  withChildrenLabel: {
    color: 'DeepPink',
  },
  select: {
    borderRadius: 3,
    borderColor: 'grey',
    backgroundColor: 'DimGray',
    color: 'khaki',
  },
  input: {
    borderRadius: 3,
    border: '1px solid #272822',
    padding: 2,
    fontFamily: 'Lucida Console, monospace',
    fontSize: 12,
    backgroundColor: 'DimGray',
    color: 'khaki',
    width: '200%',
  },
  addButton: {
    cursor: 'pointer',
    color: 'LightGreen',
    marginLeft: 15,
    fontSize: 12,
  },
  removeButton: {
    cursor: 'pointer',
    color: 'magenta',
    marginLeft: 15,
    fontSize: 12,
  },
  saveButton: {
    cursor: 'pointer',
    color: 'green',
    marginLeft: 15,
    fontSize: 12,
  },
  builtin: {
    color: 'green',
    fontSize: 12,
  },
  text: {
    color: 'khaki',
    fontSize: 12,
  },
  number: {
    color: 'purple',
    fontSize: 12,
  },
  property: {
    color: 'DeepPink',
    fontSize: 12,
  },
  collapseIcon: {
    cursor: 'pointer',
    fontSize: 8,
    color: 'teal',
  },
}
