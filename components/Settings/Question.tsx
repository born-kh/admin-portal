import React, { useState, useEffect, Fragment } from 'react'
//material ui components
import {
  TextField,
  Dialog,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Select,
  Paper,
  FormControlLabel,
  colors,
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
import { AuthSettings, PermissionType, Question, QuestionType, QuestionLanguage, Language } from '@interfaces/settings'
//constants
import { initialAlertData } from '@utils/constants'
import AddIcon from '@material-ui/icons/Add'
type LangaugeStrings = keyof typeof Language
/* AUTH Component */
export default function QuestionComponent() {
  const [questions, setQuestions] = useState<Question[]>([])

  const [alertData, setAlertData] = useState<{ type: AlertMessageType; message: string; open: boolean }>(
    initialAlertData
  )
  const [isLoading, setIsLoading] = useState(false)

  const handleCloseAlert = () => {
    setAlertData(initialAlertData)
  }

  const handleCreateQuestion = async (data: Question) => {
    console.log(data)
    return settingsAPI
      .createQuestion({ ...data, maxLen: Number(data.maxLen) })
      .then((response) => {
        setQuestions((prevQuestions) => [...prevQuestions, response.data.question])
        setAlertData({ message: `Question created`, type: AlertMessageType.sucess, open: true })
      })
      .catch((error) => {
        setAlertData({ message: `${error.message}`, type: AlertMessageType.error, open: true })
      })
  }

  const handleUpdateQuestion = async (data: Question) => {
    console.log(data)
    return settingsAPI
      .updateQuestion({ ...data })
      .then(() => {
        setQuestions(questions.map((item) => (item.id === data.id ? { ...data } : item)))

        setAlertData({ message: `Question updated.`, type: AlertMessageType.sucess, open: true })
      })
      .catch((error) => {
        setAlertData({ message: `${error.message}`, type: AlertMessageType.error, open: true })
      })
  }

  const handleDeleteQuestion = async (id: string) => {
    console.log(id)
    return settingsAPI
      .deleteQuestion({ id })
      .then(() => {
        setQuestions(questions.filter((item) => item.id !== id))
        setAlertData({ message: `Qestion deleted`, type: AlertMessageType.sucess, open: true })
      })
      .catch((error) => {
        setAlertData({ message: `${error.message}`, type: AlertMessageType.error, open: true })
      })
  }

  useEffect(() => {
    setIsLoading(true)
    settingsAPI
      .getAllQuestions()
      .then((response) => {
        console.log(response)
        if (response.status === 200) {
          console.log(response.data.questions)
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
          { title: 'Type', field: 'type', lookup: QuestionType, initialEditValue: QuestionType.checkbox },

          { title: 'Backgruund text', field: 'bgText' },
          { title: 'Max Len', field: 'maxLen', type: 'numeric' },
        ]}
        data={questions}
        components={{
          Container: (props) => <Paper {...props} elevation={0} />,
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                handleCreateQuestion({ ...newData }).then(() => {
                  resolve()
                })
              }, 100)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                handleUpdateQuestion({ ...newData }).then(() => {
                  resolve()
                })
              }, 100)
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                if (oldData.id) {
                  handleDeleteQuestion(oldData.id).then(() => {
                    resolve()
                  })
                } else {
                  resolve()
                }
              }, 100)
            }),
        }}
        detailPanel={[
          {
            tooltip: 'Question languages',

            render: (rowData) => rowData.id && <QuestioLaguageComponent questionId={rowData.id} />,
          },
        ]}
        options={{
          sorting: false,
          search: false,
        }}
      />
    </Fragment>
  )
}

const QuestioLaguageComponent = (props: { questionId: string }) => {
  const [isLoadingLanguages, setIsLoadingLanguages] = useState(false)

  const [alertData, setAlertData] = useState<{ type: AlertMessageType; message: string; open: boolean }>(
    initialAlertData
  )

  const [questionLanguages, setQuestionLanguages] = useState<QuestionLanguage[]>([])

  const handleCloseAlert = () => {
    setAlertData(initialAlertData)
  }
  useEffect(() => {
    setIsLoadingLanguages(true)
    settingsAPI
      .getAllQuestionLanguage({ questionId: props.questionId })
      .then((response) => {
        if (response.status === 200) {
          setQuestionLanguages(response.data)
        }
        setIsLoadingLanguages(false)
      })
      .catch(() => {
        setIsLoadingLanguages(false)
      })
  }, [props.questionId])

  const handleCreateQuestionLanguage = async (data: QuestionLanguage) => {
    return settingsAPI
      .createQuestionLanguage({ ...data, lang: Language.English })
      .then((response) => {
        setAlertData({ message: `Question language created`, type: AlertMessageType.sucess, open: true })
      })
      .catch((error) => {
        setAlertData({ message: `${error.message}`, type: AlertMessageType.error, open: true })
      })
  }

  const handleUpdateQuestionLanguage = async (data: QuestionLanguage) => {
    return settingsAPI
      .updateQuestionLanguage({ ...data })
      .then(() => {
        setQuestionLanguages(questionLanguages.map((item) => (item.id === data.id ? { ...data } : item)))

        setAlertData({ message: `Question  languageupdated.`, type: AlertMessageType.sucess, open: true })
      })
      .catch((error) => {
        setAlertData({ message: `${error.message}`, type: AlertMessageType.error, open: true })
      })
  }

  const handleDeleteQuestionLanguage = async (id: string) => {
    return settingsAPI
      .deleteQuestion({ id })
      .then(() => {
        setQuestionLanguages(questionLanguages.filter((item) => item.id !== id))
        setAlertData({ message: `Qestion deleted`, type: AlertMessageType.sucess, open: true })
      })
      .catch((error) => {
        setAlertData({ message: `${error.message}`, type: AlertMessageType.error, open: true })
      })
  }

  return (
    <div>
      <MaterialTable
        title="Languages"
        isLoading={isLoadingLanguages}
        localization={{ body: { emptyDataSourceMessage: 'There are no lanhuages' } }}
        columns={[
          { title: 'lang', field: 'lang', lookup: Language, initialEditValue: 'Russian' },
          { title: 'text', field: 'text' },
        ]}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                handleCreateQuestionLanguage({ ...newData, questionId: props.questionId }).then(() => {
                  resolve()
                })
              }, 100)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                handleUpdateQuestionLanguage({ ...newData }).then(() => {
                  resolve()
                })
              }, 100)
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                if (oldData.id) {
                  handleDeleteQuestionLanguage(oldData.id).then(() => {
                    resolve()
                  })
                } else {
                  resolve()
                }
              }, 100)
            }),
        }}
        data={questionLanguages}
        components={{
          Container: (props) => <Paper {...props} elevation={0} />,
        }}
        options={{
          rowStyle: {
            backgroundColor: '#EEE',
          },
          sorting: false,
          search: false,
          paging: false,
        }}
      />
      <SnackBarAlert {...alertData} onClose={handleCloseAlert} />
    </div>
  )
}
