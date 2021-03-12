import React, { useState, useEffect, Fragment } from 'react'
//material ui components
import { TextField, MenuItem, Select, Paper } from '@material-ui/core'
//material table lib
import MaterialTable from 'material-table'

import SnackBarAlert, { AlertMessageType } from '@components/common/SnackbarAlert'

//constants
import { initialAlertData } from '@utils/constants'
import useTranslation from 'hooks/useTranslation'
import { IQuestion, IQuestionLanguage, Language, QuestionType } from '@Interfaces'
import { ServiceSettingsManager } from '@Services'
/* AUTH Component */
export default function QuestionComponent() {
  const [questions, setQuestions] = useState<IQuestion[]>([])

  const [alertData, setAlertData] = useState<{ type: AlertMessageType; message: string; open: boolean }>(
    initialAlertData
  )

  const [isLoading, setIsLoading] = useState(false)

  const handleCloseAlert = () => {
    setAlertData(initialAlertData)
  }
  const { t } = useTranslation()

  const handleCreateQuestion = async (data: IQuestion) => {
    return ServiceSettingsManager.questionCreate({ ...data, maxLen: Number(data.maxLen) })
      .then((res) => {
        setQuestions((prevQuestions) => [...prevQuestions, res.result.question])
        setAlertData({ message: `Question created`, type: AlertMessageType.sucess, open: true })
      })
      .catch((error) => {
        setAlertData({ message: `${error.message}`, type: AlertMessageType.error, open: true })
      })
  }

  const handleUpdateQuestion = async (data: IQuestion) => {
    return ServiceSettingsManager.questionUpdate({ ...data })
      .then(() => {
        setQuestions(questions.map((item) => (item.id === data.id ? { ...data } : item)))

        setAlertData({ message: `Question updated.`, type: AlertMessageType.sucess, open: true })
      })
      .catch((error) => {
        setAlertData({ message: `${error.message}`, type: AlertMessageType.error, open: true })
      })
  }

  const handleDeleteQuestion = async (id: string) => {
    return ServiceSettingsManager.questionDelete({ id })
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
    ServiceSettingsManager.questionGetAll({})
      .then((res) => {
        if (res.result) {
          setQuestions(res.result.questions)
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
        title={t('questions')}
        isLoading={isLoading}
        // localization={{ body: { emptyDataSourceMessage: 'There are no questions' } }}
        columns={[
          {
            title: t('type'),
            field: 'type',
            initialEditValue: QuestionType.checkbox,
            editComponent: (props) => {
              return (
                <Select
                  value={props.value}
                  name="questionType"
                  margin="dense"
                  variant="outlined"
                  onChange={(e) => props.onChange(e.target.value)}
                >
                  {Object.entries(QuestionType).map(([key, value]) => (
                    <MenuItem key={QuestionType[value]} value={value}>
                      {key}
                    </MenuItem>
                  ))}
                </Select>
              )
            },
          },

          {
            title: t('backgroundText'),
            field: 'bgText',
            editComponent: (props) => {
              return (
                <TextField
                  value={props.value}
                  fullWidth
                  name="bgText"
                  onChange={(e) => props.onChange(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  size="small"
                />
              )
            },
          },
          { title: t('maxLen'), field: 'maxLen', type: 'numeric' },
        ]}
        data={questions}
        components={{
          Container: (props) => <Paper {...props} elevation={0} />,
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise<void>((resolve, reject) => {
              setTimeout(() => {
                handleCreateQuestion({ ...newData }).then(() => {
                  resolve()
                })
              }, 100)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise<void>((resolve, reject) => {
              setTimeout(() => {
                handleUpdateQuestion({ ...newData }).then(() => {
                  resolve()
                })
              }, 100)
            }),
          onRowDelete: (oldData) =>
            new Promise<void>((resolve, reject) => {
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
            tooltip: t('questionLanguages'),

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
  const { t } = useTranslation()
  const [questionLanguages, setQuestionLanguages] = useState<IQuestionLanguage[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null)
  const handleCloseAlert = () => {
    setAlertData(initialAlertData)
  }
  useEffect(() => {
    setIsLoadingLanguages(true)
    ServiceSettingsManager.questionLangGetByQuestionId({ questionId: props.questionId })
      .then((res) => {
        if (res.result) {
          setQuestionLanguages(res.result)
        }
        setIsLoadingLanguages(false)
      })
      .catch(() => {
        setIsLoadingLanguages(false)
      })
  }, [props.questionId])

  const handleCreateQuestionLanguage = async (data: IQuestionLanguage) => {
    return ServiceSettingsManager.questionLangCreate({ ...data })
      .then(() => {
        setAlertData({ message: `Success`, type: AlertMessageType.sucess, open: true })
      })
      .catch((error) => {
        setAlertData({ message: `${error.message}`, type: AlertMessageType.error, open: true })
      })
  }

  const handleUpdateQuestionLanguage = async (data: IQuestionLanguage) => {
    return ServiceSettingsManager.questionLangUpdate({ ...data })
      .then(() => {
        setQuestionLanguages(questionLanguages.map((item) => (item.id === data.id ? { ...data } : item)))

        setAlertData({ message: `Success`, type: AlertMessageType.sucess, open: true })
      })
      .catch((error) => {
        setAlertData({ message: `${error.message}`, type: AlertMessageType.error, open: true })
      })
  }

  const handleDeleteQuestionLanguage = async (id: string) => {
    return ServiceSettingsManager.questionLangDelete({ id })
      .then(() => {
        setQuestionLanguages(questionLanguages.filter((item) => item.id !== id))
        setAlertData({ message: `Success`, type: AlertMessageType.sucess, open: true })
      })
      .catch((error) => {
        setAlertData({ message: `${error.message}`, type: AlertMessageType.error, open: true })
      })
  }

  return (
    <div>
      <MaterialTable
        title={t('languages')}
        isLoading={isLoadingLanguages}
        columns={[
          {
            title: t('language'),
            field: 'lang',
            initialEditValue: null,
            editComponent: (props) => {
              return (
                <Select
                  value={props.value}
                  name="language"
                  margin="dense"
                  variant="outlined"
                  onChange={(e) => props.onChange(e.target.value)}
                >
                  {Object.entries(Language).map(([key, value]) => {
                    console.log(questionLanguages, props.value, value)
                    const findIndex = questionLanguages.findIndex((item) => item.lang === key)
                    if (findIndex === -1 || props.value === value) {
                      return (
                        <MenuItem key={value} value={value}>
                          {key}
                        </MenuItem>
                      )
                    }
                  })}
                </Select>
              )
            },
          },
          {
            title: t('questionText'),
            field: 'text',
            editComponent: (props) => {
              return (
                <TextField
                  value={props.value}
                  name="text"
                  fullWidth
                  onChange={(e) => props.onChange(e.target.value)}
                  variant="outlined"
                  margin="normal"
                  size="small"
                />
              )
            },
          },
        ]}
        editable={{
          onRowAdd: (newData) =>
            new Promise<void>((resolve, reject) => {
              setTimeout(() => {
                handleCreateQuestionLanguage({ ...newData, questionId: props.questionId }).then(() => {
                  resolve()
                })
              }, 100)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise<void>((resolve, reject) => {
              setTimeout(() => {
                handleUpdateQuestionLanguage({ ...newData }).then(() => {
                  resolve()
                })
              }, 100)
            }),
          onRowDelete: (oldData) =>
            new Promise<void>((resolve, reject) => {
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
