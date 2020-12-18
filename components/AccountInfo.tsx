import { Account, ItemType } from '@interfaces/user-manager'
import { Fragment } from 'react'
import MaterialList from './common/MaterialList'
import { Avatar, Box, Card, CardContent, Typography, makeStyles } from '@material-ui/core'
import useTranslation from 'hooks/useTranslation'

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

export default function AccountInfo({ account }: { account: Account }) {
  const classes = useStyles()
  const { t } = useTranslation()
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
          <MaterialList items={phones} header={t('userPhones')} />
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <MaterialList items={emails} header={t('userEmails')} />
        </CardContent>
      </Card>
    </Fragment>
  )
}
