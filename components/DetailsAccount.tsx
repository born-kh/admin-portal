import { Account, ItemType } from '@interfaces/user-manager'
import { Fragment } from 'react'

import Title from './common/Title'
import MaterialList from './common/MaterialList'
import { Avatar, Box, Button, Card, CardActions, CardContent, Divider, Typography, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {},
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
      <Card>
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
          <MaterialList items={phones} header="Phones" />
          <MaterialList items={emails} header="Emails" />
        </CardContent>
      </Card>
    </Fragment>
  )
}
