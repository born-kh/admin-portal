import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { ListSubheader } from '@material-ui/core'
import { ItemType } from '@interfaces/user-manager'
import { makeStyles } from '@material-ui/core/styles'
type PropsType = {
  items: ItemType[]
  header: string
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 200,
    backgroundColor: theme.palette.background.paper,
  },
}))

export default function ({ items, header }: PropsType) {
  const classes = useStyles()
  return (
    <List className={classes.root}>
      <ListSubheader>{header}</ListSubheader>
      {items.length === 0 && (
        <ListItem>
          <ListItemText primary={`There no ${header}`} />
        </ListItem>
      )}
      {items.map((item) => (
        <ListItem>
          <ListItemText primary={item.name} secondary={item.type} />
        </ListItem>
      ))}
    </List>
  )
}
