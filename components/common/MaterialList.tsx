import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { ListSubheader } from '@material-ui/core'
import { ItemType } from '@interfaces/user-manager'
import { makeStyles } from '@material-ui/core/styles'
import useTranslation from 'hooks/useTranslation'
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

export default function MateriaList({ items, header }: PropsType) {
  const classes = useStyles()
  const { t } = useTranslation()
  return (
    <List className={classes.root}>
      <ListSubheader>{header}</ListSubheader>
      {items.length === 0 && (
        <ListItem key={0}>
          <ListItemText primary={t('userPhones') === header ? t('noPhones') : t('noEmails')} />
        </ListItem>
      )}
      {items.map((item, i) => (
        <ListItem key={i}>
          <ListItemText primary={item.name} secondary={item.type} />
        </ListItem>
      ))}
    </List>
  )
}
