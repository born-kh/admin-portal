import { Paper, Tabs, Tab, Badge } from '@material-ui/core'
import TabPanel from '@components/common/TabPanel'
import { useState } from 'react'
import AuthSettings from '@components/Settings/AuthSettings'
import SystemSettings from '@components/Settings/SystemSettings'
import CallQuality from '@components/Settings/CallQuality'
import Question from '@components/Settings/Question'
import useTranslation from 'hooks/useTranslation'

export default function Settings() {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }
  const { t } = useTranslation()
  return (
    <>
      <Paper style={{ paddingTop: 10 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          style={{ borderBottom: '1px solid #e8e8e8' }}
        >
          <Tab
            label={
              <Badge badgeContent={0} color="secondary">
                {t('authSettings')}
              </Badge>
            }
          />
          <Tab
            label={
              <Badge badgeContent={0} color="secondary">
                {t('systemSettings')}
              </Badge>
            }
          />

          <Tab
            label={
              <Badge badgeContent={0} color="secondary">
                {t('callQuality')}
              </Badge>
            }
          />
          <Tab
            label={
              <Badge badgeContent={0} color="secondary">
                {t('questions')}
              </Badge>
            }
          />
        </Tabs>
        <TabPanel value={value} index={0}>
          <AuthSettings />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SystemSettings />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <CallQuality />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Question />
        </TabPanel>
      </Paper>
    </>
  )
}
