import React, { useState, useEffect, Fragment } from 'react'
//material ui components
import {
  Grid,
  List,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  Dialog,
  Paper,
  makeStyles,
  Theme,
  createStyles,
  ListSubheader,
  IconButton,
  ListItemSecondaryAction,
  Switch,
  FormControlLabel,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core'
//material table lib
import MaterialTable from 'material-table'
//useformik hook
import { useFormik } from 'formik'
//custom components
import { CustomDialogTitle, CustomDialogContent, CustomDialogActions } from '@components/common/Modal'
import Dashboard from '@components/Dashboard'
import SnackBarAlert, { AlertMessageType } from '@components/common/SnackbarAlert'
//settings REST APIS
import { settingsAPI } from 'service/api'
//material ui icons
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
//settings interfaces
import { AuthSettings, PermissionType, CallQuality, Question } from '@interfaces/settings'
//constants
import { initialAlertData } from '@utils/constants'
import AddIcon from '@material-ui/icons/AddBoxRounded'
import useTranslation from 'hooks/useTranslation'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: 'auto',
    },
    paper: {
      width: 200,
      height: 230,
      overflow: 'auto',
    },
    button: {
      margin: theme.spacing(0.5, 0),
    },
  })
)

function not(a: Question[], b: Question[]) {
  return a.filter((value) => b.findIndex((item) => item.id === value.id) === -1)
}

function intersection(a: Question[], b: Question[]) {
  return a.filter((value) => b.findIndex((item) => item.id === value.id) !== -1)
}

/* AUTH Component */
export default function CallQualityComponent() {
  const [callQualities, setCallQualities] = useState<CallQuality[]>([])
  const { t } = useTranslation()
  const [alertData, setAlertData] = useState<{ type: AlertMessageType; message: string; open: boolean }>(
    initialAlertData
  )
  const [questions, setQuestions] = useState<{ [key: string]: string[] }>({})
  const [allQuestions, setAllQuestions] = useState<Question[]>([])
  const classes = useStyles()
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [askIfLength, setAskIfLength] = useState(5)
  const [askIfArray, setAskIfArray] = useState([1, 2, 3, 4, 5])
  const [checked, setChecked] = React.useState<Question[]>([])
  const [left, setLeft] = React.useState<Question[]>([])
  const [right, setRight] = React.useState<Question[]>([])
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null)
  const leftChecked = intersection(checked, left)
  const rightChecked = intersection(checked, right)

  const handleToggle = (value: Question) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked))
    setLeft(not(left, leftChecked))
    setChecked(not(checked, leftChecked))
  }

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked))
    setRight(not(right, rightChecked))
    setChecked(not(checked, rightChecked))
  }

  useEffect(() => {
    if (activeQuestion) {
      const questionsIds = right.map((item) => item.id || '')
      const newQuestions = { ...questions }
      newQuestions[activeQuestion.toString()] = questionsIds
      setQuestions(newQuestions)
    }
  }, [right])

  const formik = useFormik({
    initialValues: {
      ask: true,
      askDuration: 1,
      askIf: {},
      questions: {},
    } as CallQuality,

    onSubmit: (values) => {},
  })
  const handleCloseAlert = () => {
    setAlertData(initialAlertData)
  }

  const handleClose = () => {
    setIsOpen(false)
  }
  const handleDelete = (id: string) => {
    settingsAPI
      .deleteCallQulaity({ id })
      .then(() => {
        setCallQualities(callQualities.filter((item) => item.id !== id))

        setAlertData({ message: `Success`, type: AlertMessageType.sucess, open: true })
      })
      .catch((error) => {
        setAlertData({ message: `${error.message}`, type: AlertMessageType.error, open: true })
      })
  }

  const openEditModal = (data: CallQuality) => {
    formik.setValues(data)
    setQuestions({ ...data.questions })
    setIsOpen(true)
  }
  const handleAddQuestion = () => {
    const newQuestions = { ...questions }
    const key = Object.keys(newQuestions).length + 1

    newQuestions[key.toString()] = []
    setQuestions(newQuestions)
  }
  const handleChangeQuestion = (key: string) => {
    console.log(key)
    setActiveQuestion(key)
  }
  useEffect(() => {
    if (activeQuestion) {
      const newRight = allQuestions.filter(
        (value) => questions[activeQuestion].findIndex((item) => item === value.id) !== -1
      )

      setLeft(not(allQuestions, newRight))
      setRight(newRight)
    } else {
      setLeft([])
      setRight([])
    }
  }, [activeQuestion])

  const handleDeleteQuestion = (key: string) => {
    if (key === activeQuestion) {
      setActiveQuestion(null)
    }
    const newQuestions = { ...questions }
    delete newQuestions[key]
    setQuestions(newQuestions)
  }

  const handleCraete = () => {
    let askIf: any = {}
    let index = 1

    const questionLength = Object.keys(questions).length
    if (questionLength === 1) {
      for (let i = 0; i < askIfLength; i++) {
        askIf[(i + 1).toString()] = '1'
      }
    } else if (questionLength > 0) {
      Object.keys(questions).map((key, index) => {
        if (index < askIfLength) {
          askIf[index.toString()] = key
        }

        index++
      })
      if (questionLength < askIfLength) {
        for (let i = questionLength; i < askIfLength; i++) {
          askIf[(i + 1).toString()] = null
        }
      }
    }

    console.log(askIf, questions)

    if (formik.values.id) {
      settingsAPI
        .updateCallQulaity({ ...formik.values, askIf, questions })
        .then(() => {
          setCallQualities(callQualities.map((item) => (item.id === formik.values.id ? formik.values : item)))
          handleClose()
          setAlertData({ message: `Success`, type: AlertMessageType.sucess, open: true })
        })
        .catch((error) => {
          handleClose()
          setAlertData({ message: `${error.message}`, type: AlertMessageType.error, open: true })
        })
    } else {
      settingsAPI
        .createCallQulaity({ ...formik.values, askIf, questions })
        .then((response) => {
          handleClose()
          setCallQualities([...callQualities, response.data.callQuality])
          setAlertData({ message: `Success`, type: AlertMessageType.sucess, open: true })
        })
        .catch((error) => {
          handleClose()
          setAlertData({ message: `${error.message}`, type: AlertMessageType.error, open: true })
        })
    }
  }

  useEffect(() => {
    setIsLoading(true)
    settingsAPI
      .getAllCallQulaity()
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          setCallQualities(response.data.callQualities)
        }
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })

    settingsAPI
      .getAllQuestions()
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          setAllQuestions(response.data.questions)
        }
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [])

  const handleChangeAskIfLength = (e: any) => {
    setAskIfLength(e.target.value)
  }

  const customList = (items: Question[]) => (
    <Paper className={classes.paper}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`

          return (
            <ListItem key={value.id} role="listitem" button onClick={handleToggle(value)}>
              <ListItemIcon>
                <Checkbox
                  checked={checked.findIndex((item) => item.id === value.id) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>
              <ListItemText
                id={labelId}
                primary={value.bgText}
                style={activeQuestion === value ? { color: '#3f51b5' } : {}}
              />
            </ListItem>
          )
        })}
        <ListItem />
      </List>
    </Paper>
  )

  console.log(questions)
  return (
    <Fragment>
      <SnackBarAlert {...alertData} onClose={handleCloseAlert} />
      <MaterialTable
        title={t('callQuality')}
        isLoading={isLoading}
        // localization={{ body: { emptyDataSourceMessage: 'There are no call qulaity' } }}
        columns={[
          { title: 'ID', field: 'id' },
          { title: t('ask'), field: 'ask' },
          { title: t('askDuration'), field: 'askDuration' },
          { title: t('description'), field: 'description' },
          {
            title: t('edit'),
            field: '',

            render: (rowData) =>
              rowData && (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => openEditModal(rowData)}
                >
                  {t('edit')}
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
                  onClick={() => rowData.id && handleDelete(rowData.id)}
                >
                  {t('remove')}
                </Button>
              ),
          },
        ]}
        actions={[
          {
            icon: 'add_box',
            tooltip: t('create'),
            position: 'toolbar',
            onClick: () => {
              formik.setValues({ ask: true, askDuration: 0, askIf: {}, questions: {} })
              setIsOpen(true)
            },
          },
        ]}
        data={callQualities}
        components={{
          Container: (props) => <Paper {...props} elevation={0} />,
        }}
        options={{
          sorting: false,
          search: false,
        }}
      />

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={isOpen} fullWidth maxWidth="md">
        <CustomDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {t('callQuality')}
        </CustomDialogTitle>
        <CustomDialogContent dividers>
          <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
            <Grid item>
              <Paper className={classes.paper}>
                <List
                  dense
                  component="div"
                  role="list"
                  subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      {'questions'}
                      <IconButton onClick={handleAddQuestion}>
                        {' '}
                        <AddIcon />
                      </IconButton>
                    </ListSubheader>
                  }
                >
                  {Object.keys(questions).map((value) => {
                    const labelId = `transfer-list-item-${value}-label`
                    return (
                      <ListItem key={value} role="listitem" button onClick={() => handleChangeQuestion(value)}>
                        <ListItemText id={labelId} primary={value} />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteQuestion(value)}>
                            <DeleteIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    )
                  })}
                  <ListItem />
                </List>
              </Paper>
            </Grid>

            <Grid item>
              <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
                <Grid item>{customList(left)}</Grid>
                <Grid item>
                  <Grid container direction="column" alignItems="center">
                    <Button
                      variant="outlined"
                      size="small"
                      className={classes.button}
                      onClick={handleCheckedRight}
                      disabled={leftChecked.length === 0}
                      aria-label="move selected right"
                    >
                      &gt;
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      className={classes.button}
                      onClick={handleCheckedLeft}
                      disabled={rightChecked.length === 0}
                      aria-label="move selected left"
                    >
                      &lt;
                    </Button>
                  </Grid>
                </Grid>
                <Grid item>{customList(right)}</Grid>
              </Grid>
            </Grid>
          </Grid>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FormControl variant="outlined" margin="normal" style={{ width: 100, marginRight: 20 }}>
              <InputLabel id="sources">{t('questionsCount')}</InputLabel>

              <Select
                name="sources"
                labelId="AskIfLength"
                id="AskIfLength"
                label={t('questionsCount')}
                value={askIfLength}
                onChange={handleChangeAskIfLength}
              >
                {askIfArray.map((item) => {
                  return <MenuItem value={item}>{item}</MenuItem>
                })}
              </Select>
            </FormControl>

            <TextField
              variant="outlined"
              margin="normal"
              required
              type="number"
              id="askDuration"
              onChange={formik.handleChange}
              label={t('duration')}
              name="askDuration"
              value={formik.values.askDuration}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formik.values.ask}
                  onChange={(e) => {
                    formik.setFieldValue('ask', e.target.checked)
                  }}
                  name="enabled"
                  color="primary"
                />
              }
              label={t('ask')}
              labelPlacement="start"
            />
          </div>
        </CustomDialogContent>
        <CustomDialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            {t('cancel')}
          </Button>
          <Button autoFocus onClick={handleCraete} color="primary">
            {t('ok')}
          </Button>
        </CustomDialogActions>
      </Dialog>
    </Fragment>
  )
}
