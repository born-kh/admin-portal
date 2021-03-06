import { useEffect, useState, Fragment } from 'react'
import { Button, Switch } from '@material-ui/core'
import MaterialTable from 'material-table'
import DetailsIcon from '@material-ui/icons/Details'
import DeleteIcon from '@material-ui/icons/Delete'
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle'
import { useRouter } from 'next/router'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import SnackBarAlert, { AlertMessageType } from './common/SnackbarAlert'
import { initialAlertData } from '@utils/constants'
import OpenMap from './OpenMap'
import useTranslation from 'hooks/useTranslation'
import dynamic from 'next/dynamic'
import moment from 'moment'
import { ServiceSessionManager } from '@Services'
import { IAccountSessionsData } from '@Interfaces'
import CircularProgress from '@material-ui/core/CircularProgress'
const ReactJson = dynamic(() => import('react-json-view'), { ssr: false })

export default function AccountSessions() {
  const [sessions, setSessions] = useState<IAccountSessionsData[]>([])
  const [sessionsIsLoading, setSessionsIsLoading] = useState(false)
  const [sessionID, setSessionID] = useState<string | null>(null)
  const [mapPosition, setMapPosition] = useState<number[]>([])
  const [alertData, setAlertData] = useState<{ type: AlertMessageType; message: string; open: boolean }>(
    initialAlertData
  )
  const [open, setOpen] = useState(false)
  const [isLoadingDelete, setIsLoadingDelete] = useState(false)
  const [tracingSessionID, setTracingSessionID] = useState<string | null>(null)
  const [suspendSessionID, setSuspendSessionID] = useState<string | null>(null)
  const [sessionData, setSessionData] = useState<IAccountSessionsData | null>(null)
  const router = useRouter()
  const { t } = useTranslation()
  const handleCloseAlert = () => {
    setAlertData(initialAlertData)
  }
  const [accountID, setAccountID] = useState<string | null>(null)

  useEffect(() => {
    function loadData() {
      setSessionsIsLoading(true)
      ServiceSessionManager.getSessions({ accountID })

        .then((res) => {
          if (res.result) {
            setSessions(res.result.sessions)
          } else {
            setAlertData({ message: res.error.reason, type: AlertMessageType.error, open: true })
          }

          setSessionsIsLoading(false)
        })
        .catch(() => {
          setSessionsIsLoading(false)
        })
    }
    if (accountID) {
      loadData()
    } else {
      setAccountID(router.query.id as string)
    }
  }, [router])

  const handleClose = () => {
    setOpen(false)
    setSessionData(null)
  }

  const handleOpenMap = (sessionIP: string) => {
    fetch(`http://api.ipstack.com/${sessionIP}?access_key=98b92bffbfd727524f6027db62913163`)
      .then((response) => {
        return response.json()
      })
      .then((myJson) => {
        if (myJson.latitude) {
          setMapPosition([myJson.latitude, myJson.longitude])
        } else {
          setAlertData({ message: 'Session IP is private', type: AlertMessageType.info, open: true })
        }
      })
      .catch((e) => {
        setAlertData({ message: 'Session IP is private', type: AlertMessageType.info, open: true })
      })
  }

  const handleSetTracing = (params: { sessionID: string; isTracing: boolean }) => {
    setTracingSessionID(params.sessionID)
    ServiceSessionManager.setTracing({ ...params, accountID })
      .then((res) => {
        if (res.result) {
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
        } else {
          setAlertData({ message: res.error.reason, type: AlertMessageType.error, open: true })
        }
        setTracingSessionID(null)
      })
      .catch(() => {
        setAlertData({ message: 'Set Tracer is not updated', type: AlertMessageType.error, open: true })
        setTracingSessionID(null)
      })
  }

  const handleSetSuspended = (params: { sessionID: string; isSuspended: boolean }) => {
    setSuspendSessionID(params.sessionID)
    ServiceSessionManager.setSuspendSession({ ...params, accountID })
      .then((res) => {
        if (res.result) {
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
        } else {
          setAlertData({ message: res.error.reason, type: AlertMessageType.error, open: true })
        }
        setSuspendSessionID(null)
      })
      .catch(() => {
        setAlertData({ message: 'Set Suspendis not updated', type: AlertMessageType.error, open: true })
        setSuspendSessionID(null)
      })
  }

  const handleDeleteSession = () => {
    setIsLoadingDelete(true)
    if (sessionID) {
      ServiceSessionManager.sessionRemove({ sessionID, accountID })
        .then((response) => {
          if (response.result) {
            setSessions((prevSessions) => {
              const sessions = prevSessions.filter((session) => session.meta.sessionID !== sessionID)
              return sessions
            })
            setAlertData({ message: 'Removed session', type: AlertMessageType.sucess, open: true })
          } else {
            setAlertData({ message: response.error.reason, type: AlertMessageType.error, open: true })
          }

          setOpen(false)
          setSessionID(null)
          setIsLoadingDelete(false)
        })
        .catch(() => {
          setOpen(false)
          setAlertData({ message: 'Not removed sesssion', type: AlertMessageType.error, open: true })
          setSessionID(null)
          setIsLoadingDelete(false)
        })
    }
  }

  return (
    <Fragment>
      <MaterialTable
        title=""
        style={{ marginBottom: 20 }}
        isLoading={sessionsIsLoading}
        localization={{
          body: { emptyDataSourceMessage: t('noSessions') },
          toolbar: { searchPlaceholder: t('search') },
          pagination: {
            firstTooltip: t('firstTooltip'),
            lastTooltip: t('lastTooltip'),
            previousTooltip: t('previousTooltip'),
            nextTooltip: t('nextTooltip'),
            labelRowsSelect: t('labelRowsSelect'),
          },
        }}
        columns={[
          { title: '???', field: '', render: (rowData) => rowData && rowData.tableData.id + 1, width: 75 },
          { title: t('deviceName'), field: 'meta.deviceName' },
          { title: t('platform'), field: 'meta.platform' },
          { title: t('ip'), field: 'meta.ip' },
          {
            title: t('lastActive'),
            field: 'lastActive',
            render: (rowData) => rowData.lastActive && moment(rowData.lastActive).format('DD MMM YYYY HH:mm'),
          },

          {
            title: t('setTracing'),
            field: '',
            align: 'center',
            render: (rowData) =>
              rowData &&
              (tracingSessionID && tracingSessionID === rowData.meta.sessionID ? (
                <CircularProgress size={28} />
              ) : (
                <Switch
                  checked={rowData.isTracing}
                  onChange={() =>
                    handleSetTracing({ sessionID: rowData.meta.sessionID, isTracing: !rowData.isTracing })
                  }
                  name="checkedA"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              )),
          },
          {
            title: t('suspendSession'),
            field: '',
            align: 'center',
            render: (rowData) =>
              rowData &&
              (suspendSessionID && suspendSessionID === rowData.meta.sessionID ? (
                <CircularProgress size={28} />
              ) : (
                <Switch
                  checked={rowData.isSuspended}
                  onChange={() =>
                    handleSetSuspended({ sessionID: rowData.meta.sessionID, isSuspended: !rowData.isSuspended })
                  }
                  name="checkedA"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
              )),
          },
          {
            title: t('detailInfo'),
            field: '',

            render: (rowData) =>
              rowData && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setSessionData(rowData)
                  }}
                  startIcon={<DetailsIcon />}
                >
                  {t('detail')}
                </Button>
              ),
          },

          {
            title: t('geoLocation'),
            field: '',

            render: (rowData) =>
              rowData && (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<PersonPinCircleIcon />}
                  onClick={() => handleOpenMap(rowData.meta.ip)}
                >
                  {t('location')}
                </Button>
              ),
          },
          {
            title: t('remove'),
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
                  {t('remove')}
                </Button>
              ),
          },
        ]}
        data={sessions}
        options={{
          search: false,
          rowStyle: {
            fontFamily: 'Roboto',
            color: 'rgba(0, 0, 0, 0.87)',
            fontSize: '0.875rem',
            fontWeight: 400,
          },
        }}
      />
      <SnackBarAlert {...alertData} onClose={handleCloseAlert} />
      <OpenMap open={mapPosition.length !== 0} handleClose={() => setMapPosition([])} position={mapPosition} />
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
        {isLoadingDelete ? (
          <DialogActions>
            <CircularProgress size={28} />
          </DialogActions>
        ) : (
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              {t('disagree')}
            </Button>
            <Button onClick={handleDeleteSession} color="primary">
              {t('agree')}
            </Button>
          </DialogActions>
        )}
      </Dialog>

      <Dialog
        open={!!sessionData}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t('detail')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{<ReactJson src={sessionData || {}} />}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            {t('ok')}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}
