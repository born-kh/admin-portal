import { useEffect, useState, Fragment } from 'react'

import { Button, Switch } from '@material-ui/core'

import * as usermanagerAPI from 'service/userManagerAPI'
import MaterialTable from 'material-table'
import DetailsIcon from '@material-ui/icons/Details'

import DeleteIcon from '@material-ui/icons/Delete'
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle'
import { useRouter } from 'next/router'
import instance from '@utils/instance'
import { AccountSessionsData } from '@interfaces/user-manager'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import SnackBarAlert, { AlertMessageType } from './common/SnackbarAlert'

const initialAlertData = { type: AlertMessageType.sucess, message: '', open: false }
export default function () {
  const [sessions, setSessions] = useState<AccountSessionsData[]>([])
  const [sessionsIsLoading, setSessionsIsLoading] = useState(false)
  const [sessionID, setSessionID] = useState<string | null>(null)

  const [alertData, setAlertData] = useState<{ type: AlertMessageType; message: string; open: boolean }>(
    initialAlertData
  )
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const handleCloseAlert = () => {
    setAlertData(initialAlertData)
  }

  useEffect(() => {
    function loadData() {
      setSessionsIsLoading(true)
      usermanagerAPI
        .getAccountSessions(router.query.id as string)
        .then((sessions) => {
          setSessions(sessions)
          setSessionsIsLoading(false)
        })
        .catch(() => {
          setSessionsIsLoading(false)
        })
    }
    if (router.query.id) {
      loadData()
    }
  }, [router])

  const handleClose = () => {
    setOpen(false)
  }

  const handleSetTracing = (params: { sessionID: string; isTracing: boolean }) => {
    instance
      .post('/settracer', params)
      .then((response) => {
        setSessions((prevSessions) => {
          const sessions = prevSessions.map((session) => {
            if (session.meta.sessionID === params.sessionID) {
              return { ...session, isTracing: params.isTracing }
            } else {
              return session
            }
          })
          return sessions
        })

        setAlertData({ message: 'Set Tracer is updated', type: AlertMessageType.sucess, open: true })
      })
      .catch(() => {
        setAlertData({ message: 'Set Tracer is not updated', type: AlertMessageType.error, open: true })
      })
  }

  const handleSetSuspended = (params: { sessionID: string; isSuspended: boolean }) => {
    instance
      .post('/suspendsession', params)
      .then((response) => {
        setSessions((prevSessions) => {
          const sessions = prevSessions.map((session) => {
            if (session.meta.sessionID === params.sessionID) {
              return { ...session, isSuspended: params.isSuspended }
            } else {
              return session
            }
          })
          return sessions
        })

        setAlertData({ message: 'Set Suspend is updated', type: AlertMessageType.sucess, open: true })
      })
      .catch(() => {
        setAlertData({ message: 'Set Suspendis not updated', type: AlertMessageType.error, open: true })
      })
  }

  const handleDeleteSession = () => {
    instance
      .post('/removesession', { sessionID })
      .then((response) => {
        setOpen(true)
        setSessions((prevSessions) => {
          const sessions = prevSessions.filter((session) => session.meta.sessionID !== sessionID)
          return sessions
        })
      })
      .catch(() => {
        setOpen(false)
      })
  }

  return (
    <Fragment>
      <MaterialTable
        title="Sessions"
        isLoading={sessionsIsLoading}
        localization={{ body: { emptyDataSourceMessage: 'There are no sessions' } }}
        columns={[
          { title: 'Device Name', field: 'meta.deviceName' },
          { title: 'Platform', field: 'meta.platform' },
          { title: 'IP', field: 'meta.ip' },

          {
            title: 'Set Trasing',
            field: '',

            render: (rowData) =>
              rowData && (
                <Switch
                  checked={rowData.isTracing}
                  onChange={() =>
                    handleSetTracing({ sessionID: rowData.meta.sessionID, isTracing: !rowData.isTracing })
                  }
                  name="checkedA"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              ),
          },
          {
            title: 'Set Suspend',
            field: '',

            render: (rowData) =>
              rowData && (
                <Switch
                  checked={rowData.isSuspended}
                  onChange={() =>
                    handleSetSuspended({ sessionID: rowData.meta.sessionID, isSuspended: !rowData.isSuspended })
                  }
                  name="checkedA"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              ),
          },
          {
            title: 'Detail Info',
            field: '',

            render: (rowData) =>
              rowData && (
                <Button variant="contained" color="primary" onClick={() => {}} startIcon={<DetailsIcon />}>
                  Info
                </Button>
              ),
          },

          {
            title: 'Geo Location',
            field: '',

            render: (rowData) =>
              rowData && (
                <Button variant="contained" color="primary" startIcon={<PersonPinCircleIcon />}>
                  Location
                </Button>
              ),
          },
          {
            title: 'Delete',
            field: '',

            render: (rowData) =>
              rowData && (
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    setSessionID(rowData.meta.sessionID)
                    setOpen(true)
                  }}
                >
                  Delete
                </Button>
              ),
          },
        ]}
        data={sessions}
        options={{
          search: false,
        }}
      />
      <SnackBarAlert {...alertData} onClose={handleCloseAlert} />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure you want to remove this session?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteSession} color="primary" autoFocus>
            Agree
          </Button>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}
