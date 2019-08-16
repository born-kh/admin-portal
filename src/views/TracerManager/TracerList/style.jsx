export default theme => ({
  root: {
    padding: theme.spacing(1) * 3
  },
  content: {
    marginTop: theme.spacing(1) * 2
  },
  progressWrapper: {
    paddingTop: '48px',
    paddingBottom: '24px',
    display: 'flex',
    justifyContent: 'center'
  },

  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },

  textField: {
    width: '180px',
    maxWidth: '100%',
    marginRight: theme.spacing(1) * 2
  },
  searchInput: {
    marginRight: theme.spacing(1)
  },
  deleteButton: {
    color: theme.palette.danger.main,
    marginRight: theme.spacing(1)
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  importIcon: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  exportIcon: {
    marginRight: theme.spacing(1)
  }
});
