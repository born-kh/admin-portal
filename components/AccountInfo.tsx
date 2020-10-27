import { Account, ItemType } from '@interfaces/user-manager'
import { Fragment } from 'react'

import Title from './common/Title'
import MaterialList from './common/MaterialList'
import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  card: {
    width: 300,
    marginBottom: 20,
  },
  cardProfile: {
    width: 400,
    marginBottom: 20,
  },
  avatar: {
    height: 100,
    width: 100,
  },
}))

export default function ({ account }: { account: Account }) {
  const classes = useStyles()

  const phones: ItemType[] = account.phones.map((phone) => ({ name: phone.number, type: phone.type }))
  const emails: ItemType[] = account.emails.map((email) => ({ name: email.email, type: email.type }))
  return (
    <Fragment>
      <Card className={classes.cardProfile}>
        <CardContent>
          <Box alignItems="center" display="flex" flexDirection="column">
            <Avatar className={classes.avatar} src={account.avatar} />
            <Typography color="textPrimary" gutterBottom variant="h5">
              {account.username}
            </Typography>
            <Typography color="textPrimary" gutterBottom variant="h5">
              {account.status}
            </Typography>
            <Typography color="textSecondary" variant="body1">
              {`${account.firstName} ${account.lastName}`}
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <MaterialList items={phones} header="Phones" />
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <MaterialList items={emails} header="Emails" />
        </CardContent>
      </Card>
    </Fragment>
  )
}
