export default theme => ({
  root: {
    padding: theme.spacing.unit * 3
  },
  content: {
    marginTop: theme.spacing.unit * 2
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
    marginTop: theme.spacing.unit
  },
  spacer: {
    flexGrow: 1
  },
  
  textField: {
    width: '180px',
    maxWidth: '100%',
    marginRight: theme.spacing.unit * 2
  },
  searchInput: {
    marginRight: theme.spacing.unit
  }
});
