import { Account, ItemType } from '@interfaces/user-manager'
import { Fragment, useState } from 'react'
import MaterialList from './common/MaterialList'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  makeStyles,
  Button,
  List,
  ListSubheader,
  ListItem,
  ListItemText,
  TextField,
  Switch,
  FormControlLabel,
} from '@material-ui/core'
import useTranslation from 'hooks/useTranslation'
import { userAPI } from 'service/api'
import Title from './common/Title'
import { SystemSettings } from '@interfaces/settings'

const useStyles = makeStyles(() => ({
  card: {
    width: 250,
    marginBottom: 20,
    textAlign: 'center',
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

export default function AccountInfo({
  account,
  settings,
  handleChangeSetings,
}: {
  account: Account
  settings: SystemSettings
  handleChangeSetings: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  const classes = useStyles()
  const { t } = useTranslation()
  const phones: ItemType[] = account.phones.map((phone) => ({ name: phone.number, type: phone.type }))
  const emails: ItemType[] = account.emails.map((email) => ({ name: email.email, type: email.type }))
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingSettigns, setIsLoadingSettings] = useState(false)
  const handleGeneratePassword = () => {
    setIsLoading(true)
    userAPI
      .setPassword({ accountID: account.accountID })
      .then(() => {
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
      .catch(() => {})
  }
  const handleSetSettings = () => {
    setIsLoadingSettings(true)
    userAPI
      .systemSetAccountSettings({
        accountID: account.accountID,
        settings: { id: settings.id, description: settings.description, user: settings.user },
      })
      .then(() => {
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
      .catch(() => {})
  }

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
      <Card className={classes.card}>
        <CardContent>
          <List className={classes.card}>
            <ListSubheader>{t('auth')}</ListSubheader>
            <ListItem>
              <ListItemText primary={'Has Password'} secondary={account.auth.hasPassword ? t('yes') : t('no')} />
            </ListItem>
            {account.auth.status && (
              <ListItem>
                <ListItemText primary={t('status')} secondary={account.auth.status} />
              </ListItem>
            )}
            {account.auth.status && (
              <ListItem>
                <ListItemText primary={t('type')} secondary={account.auth.passwordType} />
              </ListItem>
            )}
          </List>
          <Button variant="contained" color="primary" disabled={isLoading} onClick={handleGeneratePassword}>
            {t('generatePassword')}
          </Button>
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardContent>
          <Title>{t('autoDelete')}</Title>
          <FormControlLabel
            control={
              <Switch
                checked={settings.user?.autoDelete.enabled}
                onChange={handleChangeSetings}
                name="enabled"
                color="primary"
              />
            }
            label={t('enabled')}
            labelPlacement="start"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            type="number"
            id="autoDeleteDays"
            onChange={handleChangeSetings}
            label={t('days')}
            name="autoDeleteDays"
            value={settings.user?.autoDelete.days}
          />
          <TextField
            variant="outlined"
            margin="normal"
            id="description"
            onChange={handleChangeSetings}
            label={t('description')}
            name="description"
            value={settings.description}
          />
          <Button
            variant="contained"
            color="primary"
            disabled={isLoadingSettigns}
            onClick={handleSetSettings}
            style={{ marginTop: 10 }}
          >
            {t('save')}
          </Button>
        </CardContent>
      </Card>
    </Fragment>
  )
}
