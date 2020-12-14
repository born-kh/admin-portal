import React, { useState, useEffect, Fragment } from 'react'
//material ui components
import { TextField, Dialog, MenuItem, InputLabel, FormControl, Button, Select } from '@material-ui/core'
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
import { AuthSettings, PermissionType, Question } from '@interfaces/settings'
//constants
import { initialAlertData } from '@utils/constants'

/* AUTH Component */
export default function () {
  const [questions, setQuestions] = useState<Question[]>([])
  const [alertData, setAlertData] = useState<{ type: AlertMessageType; message: string; open: boolean }>(
    initialAlertData
  )
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const formik = useFormik({
    initialValues: {} as Question,

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
      .deleteQuestion({ id })
      .then(() => {
        setQuestions(questions.filter((item) => item.id !== id))

        setAlertData({ message: `Qestion deleted`, type: AlertMessageType.sucess, open: true })
      })
      .catch((error) => {
        setAlertData({ message: `Question ${error.message}`, type: AlertMessageType.error, open: true })
      })
  }

  const openEditModal = (data: Question) => {
    formik.setValues(data)
    setIsOpen(true)
  }
  const handleCraete = () => {
    if (formik.values.id) {
      settingsAPI
        .updateQuestion(formik.values)
        .then(() => {
          setQuestions(questions.map((item) => (item.id === formik.values.id ? formik.values : item)))
          handleClose()
          setAlertData({ message: `Question updated.`, type: AlertMessageType.sucess, open: true })
        })
        .catch((error) => {
          handleClose()
          setAlertData({ message: `Question ${error.message}`, type: AlertMessageType.error, open: true })
        })
    } else {
      settingsAPI
        .createQuestion(formik.values)
        .then((response) => {
          setQuestions((prevQuestions) => [...prevQuestions, response.data.question])
          setAlertData({ message: `Question created`, type: AlertMessageType.sucess, open: true })
        })
        .catch((error) => {
          handleClose()
          setAlertData({ message: `Create Question ${error.message}`, type: AlertMessageType.error, open: true })
        })
    }
  }

  useEffect(() => {
    setIsLoading(true)
    settingsAPI
      .getAllQuestions()
      .then((response) => {
        if (response.status === 200) {
          setQuestions(response.data.questions)
        }
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [])

  return (
    <Fragment>
      <SnackBarAlert {...alertData} onClose={handleCloseAlert} />
      <MaterialTable
        title="Questions"
        isLoading={isLoading}
        localization={{ body: { emptyDataSourceMessage: 'There are no questions' } }}
        columns={[
          { title: 'ID', field: 'id' },
          { title: 'Text', field: 'text' },
          { title: 'Type', field: 'type' },
          { title: 'bgtext', field: 'bgtext' },
          {
            title: 'Edit',
            field: '',

            render: (rowData) =>
              rowData && (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => openEditModal(rowData)}
                >
                  Edit
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
                  onClick={() => rowData.id && handleDelete(rowData.id)}
                >
                  Delete
                </Button>
              ),
          },
        ]}
        actions={[
          {
            icon: 'add_box',
            tooltip: 'Create question',
            position: 'toolbar',
            onClick: () => {
              formik.setValues({})
              setIsOpen(true)
            },
          },
        ]}
        data={questions}
        options={{
          sorting: false,
          search: false,
        }}
      />

      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={isOpen} fullWidth maxWidth="xs">
        <CustomDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Question
        </CustomDialogTitle>
        <CustomDialogContent dividers style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ width: 300 }}
            id="text"
            name="text"
            label="text"
            onChange={formik.handleChange}
            value={formik.values.text}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ width: 300 }}
            id="type"
            name="type"
            label="type"
            onChange={formik.handleChange}
            value={formik.values.type}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ width: 300 }}
            id="bgText"
            name="bgText"
            label="bgText"
            onChange={formik.handleChange}
            value={formik.values.bgtext}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            style={{ width: 300 }}
            id="maxlen"
            name="maxlen"
            label="maxlen"
            onChange={formik.handleChange}
            value={formik.values.maxlen}
          />
        </CustomDialogContent>
        <CustomDialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button autoFocus onClick={() => {}} color="primary">
            OK
          </Button>
        </CustomDialogActions>
      </Dialog>
    </Fragment>
  )
}
