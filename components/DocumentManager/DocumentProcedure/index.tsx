import React, { Fragment, useEffect, useState } from 'react'
import MultiStep from './MultiStep'
import {
  DocumentTypes,
  Document,
  DocumentStatus,
  Fields,
  SexType,
  MRZTD1,
  MRZTD3,
  StepType,
  ApplicationStatus,
} from '@interfaces/document-manager'
import * as documentManagerAPI from 'service/documentManagerAPI'
import { useFormik } from 'formik'
import { convertMRZDate } from '@utils/helpers'
import Selfie from './Steps/Selfie'
import Passport from './Steps/Passport'
import EditDocument from './Steps/EditDocument'
import ConfirmDocument from './Steps/ConfirmDocument'
import {
  Dialog,
  DialogTitle,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  ListSubheader,
  Typography,
  Paper,
} from '@material-ui/core'
import { CustomDialogTitle, CustomDialogActions, CustomDialogContent } from '@components/common/Modal'
import { rejectMessages, initialAlertData } from '@utils/constants'
import { AccountStatus } from '@interfaces/user-manager'
import { SetApplicationStatusParams, SetDocumentStatusParams } from '@interfaces/api'
import { documentAPI } from 'service/api'
import SnackBarAlert, { AlertMessageType } from '@components/common/SnackbarAlert'
import FaceIcon from '@material-ui/icons/Face'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import EditIcon from '@material-ui/icons/Edit'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import PageLoader from 'next/dist/client/page-loader'
import Loader from '@components/common/Loader'
type PropsType = {
  documents: Document[]
  documentSetID: string
  applicationID: string
  accountID: string
  handleDoneDocumentProcedure: () => void
}

const DocumentProcedure = (props: PropsType) => {
  const [rejectMessage, setRejectMessage] = useState('')
  const [rejectMessageIndex, setRejectMessageIndex] = useState<number | null>(0)
  const [documentTypes, setDocumentTypes] = useState<DocumentTypes[]>([])
  const [passportDocuments, setPassportDocuments] = useState<Document[]>([])
  const [editDocumentStatus, setEditDocumentStatus] = useState<DocumentStatus>(DocumentStatus.rejected)
  const [mapPosition, setMapPosition] = useState({})
  const [isReject, setIsReject] = useState(false)
  const [isOpenMap, setIsOpenMap] = useState(false)
  const [isLoadingTypes, setIsLoadingTypes] = useState(false)
  const [documentTypeID, setDocumentTypeID] = useState<string | null>(null)
  const [alertData, setAlertData] = useState<{ type: AlertMessageType; message: string; open: boolean }>(
    initialAlertData
  )
  const [blocking, setBlocking] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleCloseAlert = () => {
    setAlertData(initialAlertData)
  }

  const formik = useFormik({
    initialValues: {
      documentID: '',
      fields: {
        passport: {
          type: '',
          country: '',
          number: '',
          date_of_birth: new Date().toISOString().split('.')[0] + 'Z',
          expiration_date: new Date().toISOString().split('.')[0] + 'Z',
          issue_date: new Date().toISOString().split('.')[0] + 'Z',
          nationality: '',
          sex: SexType.Unknown,
          first_name: '',
          last_name: '',
          personal_number: '',
          address: undefined,
          issuingAuth: undefined,
        },
      } as Fields,
    },

    onSubmit: (values) => {},
  })

  useEffect(() => {
    if (passportDocuments.length > 0) {
      const passportFields = passportDocuments.filter((item) => {
        return item.fields?.passport
      })

      if (passportFields.length > 0 && passportFields[0].fields) {
        formik.setValues({ documentID: passportFields[0].ID, fields: passportFields[0].fields })
      } else {
        const filterPassport = passportDocuments.filter((item) => {
          return item.recognized
        })

        var document: Document = filterPassport.length > 0 ? filterPassport[0] : passportDocuments[0]

        if (document.recognized && document.recognized.mrz?.passport) {
          const passport = document.recognized.mrz?.passport
          formik.setValues({
            documentID: document.ID,
            fields: {
              passport: {
                country: passport.country,
                expiration_date: convertMRZDate(passport.expiration_date, 'expiry') || '',
                date_of_birth: convertMRZDate(passport.date_of_birth, 'dob') || '',
                sex: passport.sex,
                type: passport.type,
                issue_date: convertMRZDate(passport.expiration_date, 'issue') || '',
                last_name: passport.surname,
                first_name: passport.names,
                nationality: passport.nationality,
                number: passport.number,
                personal_number: passport.personal_number,
              },
            },
          })
        } else if (document.recognized && document.recognized.mrz?.idcard) {
          const idCard = document.recognized.mrz.idcard
          formik.setValues({
            documentID: document.ID,
            fields: {
              passport: {
                country: idCard.country,
                expiration_date: convertMRZDate(idCard.expiration_date, 'expiry') || '',
                date_of_birth: convertMRZDate(idCard.date_of_birth, 'dob') || '',
                sex: idCard.sex,
                type: idCard.type,
                issue_date: convertMRZDate(idCard.expiration_date, 'issue') || '',
                last_name: idCard.surname,
                first_name: idCard.names,
                nationality: idCard.nationality,
                number: idCard.number,
                personal_number: idCard.national_id,
              },
            },
          })
        }
      }
    }
  }, [passportDocuments])

  useEffect(() => {
    function setTypes(types: DocumentTypes[]) {
      let approves = 0
      const newDocumentTypes = types.map((documentType) => {
        const docs = props.documents.filter(
          (doc) => doc.documentType.ID === documentType.ID && doc.documenSet.ID === props.documentSetID
        )

        documentType.documents = docs
        const approvedDocuments = props.documents.filter(
          (doc) =>
            doc.documentType.ID === documentType.ID &&
            doc.documenSet.ID === props.documentSetID &&
            doc.status === DocumentStatus.approved
        )

        const newDocuments = props.documents.filter(
          (doc) =>
            doc.documentType.ID === documentType.ID &&
            doc.documenSet.ID === props.documentSetID &&
            doc.status !== DocumentStatus.approved &&
            doc.status !== DocumentStatus.rejected
        )
        let status =
          approvedDocuments.length > 0
            ? DocumentStatus.approved
            : newDocuments.length > 0
            ? DocumentStatus.new
            : DocumentStatus.rejected
        if (approvedDocuments.length > 0) {
          approves++
        }
        documentType.status = status

        return documentType
      })

      setPassportDocuments(
        props.documents.filter(
          (doc) => doc.documenSet.ID === props.documentSetID && doc.documentType.typeName !== 'SELFIE'
        )
      )
      if (approves === newDocumentTypes.length) {
        setEditDocumentStatus(DocumentStatus.approved)
      } else {
        setEditDocumentStatus(DocumentStatus.rejected)
      }

      setDocumentTypes(newDocumentTypes)
      setIsLoadingTypes(false)
    }

    async function loadTypes() {
      setIsLoadingTypes(true)
      documentManagerAPI
        .fetchTypes(props.documentSetID)
        .then((types) => {
          if (types) {
            setTypes(types)
          }
        })
        .catch(() => {
          setIsLoadingTypes(false)
        })
    }

    if (documentTypes.length === 0 && props.documentSetID) {
      loadTypes()
    } else {
      setTypes(documentTypes)
    }
  }, [props.documentSetID, props.documents])

  const renderSteps = () => {
    var stepsDocuments: StepType[] = documentTypes.map((documentType) => {
      console.log(documentType)
      if (documentType.name === 'SELFIE') {
        return {
          name: documentType.note || '',
          status: documentType.status,
          icon: <FaceIcon />,
          component: <Selfie document={documentType} passportDocuments={passportDocuments} />,
          typeID: documentType.ID,
        }
      } else {
        return {
          name: documentType.note || '',
          status: documentType.status,
          icon: <AssignmentIndIcon />,
          component: <Passport />,
          typeID: documentType.ID,
        }
      }
    })
    const stepsConfirm = [
      {
        name: 'Edit Document',
        status: DocumentStatus.new,
        icon: <EditIcon />,
        component: <EditDocument />,
      },
      {
        name: 'Confirm Document',
        status: DocumentStatus.new,
        icon: <DoneAllIcon />,
        component: <ConfirmDocument />,
      },
    ]
    return stepsDocuments.concat(stepsConfirm)
  }
  const _saveDocumentData = () => {
    setBlocking(true)
    documentAPI
      .setDocumentFields(formik.values)
      .then((response) => {
        handleClose()
        setAlertData({ message: response.data.message, type: AlertMessageType.sucess, open: true })
      })
      .catch((error) => {
        setAlertData({ message: `Save Document data ${error.message}`, type: AlertMessageType.sucess, open: true })
      })
  }

  const _setDocumentStatus = (status: DocumentStatus, typeID: string) => {
    const { applicationID, accountID, documentSetID } = props
    const params: SetDocumentStatusParams = {
      documentTypeID: typeID,
      documentSetID,
      user: accountID,
      status: status,
      applicationID: applicationID,
    }
    console.log('_setDocumentStatus', params)
    if (status === DocumentStatus.rejected) {
      params.reason = rejectMessage
    }
    setBlocking(true)
    documentAPI
      .setDocumentStatus(params)
      .then((response) => {
        handleClose()
        setAlertData({ message: response.data.message, type: AlertMessageType.sucess, open: true })
        handleNext()
      })
      .catch((error) => {
        handleClose()
        setAlertData({ message: `Document set status ${error.message}`, type: AlertMessageType.sucess, open: true })
      })
  }

  const _setApplicationStatus = (status: ApplicationStatus) => {
    const { applicationID, accountID, documentSetID } = props
    const params: SetApplicationStatusParams = {
      user: accountID,
      applicationID,
      status,
      documentSetID,
    }
    console.log('_setApplicationStatus', params)

    if (status === ApplicationStatus.rejected) {
      params.reason = rejectMessage
    }
    setBlocking(true)
    documentAPI
      .setApplicationStatus(params)
      .then((response) => {
        handleClose()
        setAlertData({ message: response.data.message, type: AlertMessageType.sucess, open: true })
      })
      .catch((error) => {
        handleClose()
        setAlertData({ message: `Application set status ${error.message}`, type: AlertMessageType.sucess, open: true })
      })
  }

  const handleClose = () => {
    setDocumentTypeID(null)
    setIsOpenMap(false)
    setIsReject(false)
    setBlocking(false)
  }

  const renderRejectMessages = () => {
    return (
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" maxWidth={'lg'} open={isReject}>
        <CustomDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Select Message
        </CustomDialogTitle>
        <CustomDialogContent dividers>
          <Typography variant="h6">Selfie</Typography>
          <List>
            {rejectMessages.map((val, index) => {
              if (val.selfie) {
                return (
                  <ListItem
                    button
                    key={index}
                    selected={rejectMessageIndex === index}
                    onClick={() => {
                      setRejectMessageIndex(index)
                      setRejectMessage(val.selfie)
                    }}
                  >
                    <ListItemText
                      primary={
                        <Fragment>
                          {' '}
                          <b>{index + 1} </b>
                          {val.selfie}
                        </Fragment>
                      }
                    />
                  </ListItem>
                )
              }
              return null
            })}
            <Typography variant="h6">Passport</Typography>
            {rejectMessages.map((val, index) => {
              if (val.passport) {
                return (
                  <ListItem
                    key={index}
                    button
                    selected={rejectMessageIndex === index}
                    onClick={() => {
                      setRejectMessageIndex(index)
                      setRejectMessage(val.passport)
                    }}
                  >
                    <ListItemText
                      primary={
                        <Fragment>
                          <b>{index + 1} </b> {val.passport}{' '}
                        </Fragment>
                      }
                    />
                  </ListItem>
                )
              }
              return
            })}

            <ListItem
              key={20}
              button
              selected={rejectMessageIndex === null}
              onClick={() => setRejectMessageIndex(null)}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="rejectMessage"
                name="rejectMessage"
                autoFocus
                value={rejectMessage}
                onChange={(e) => {
                  setRejectMessage(e.target.value)
                }}
              />
            </ListItem>
          </List>
        </CustomDialogContent>
        <CustomDialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>

          {!documentTypeID ? (
            <Button color="primary" onClick={() => _setApplicationStatus(ApplicationStatus.rejected)}>
              Ok
            </Button>
          ) : (
            <Button
              color="primary"
              disabled={blocking}
              onClick={() => _setDocumentStatus(DocumentStatus.rejected, documentTypeID)}
            >
              Ok
            </Button>
          )}
        </CustomDialogActions>
      </Dialog>
    )
  }
  if (isLoadingTypes) {
    return <Loader />
  }

  return (
    <Fragment>
      <SnackBarAlert {...alertData} onClose={handleCloseAlert} />
      <Paper>
        <MultiStep
          steps={renderSteps()}
          handleRejectApplication={() => {
            setDocumentTypeID(null)
            setIsReject(true)
          }}
          blocking={blocking}
          handleNext={handleNext}
          handleBack={handleBack}
          activeStep={activeStep}
          handleDoneDocumentProcedure={props.handleDoneDocumentProcedure}
          handleSetActiveStep={(val) => setActiveStep(val)}
          handleApproveDocument={_setDocumentStatus}
          handleRejectDocument={(value) => {
            setDocumentTypeID(value)
            setIsReject(true)
          }}
          handleApproveApplication={_setApplicationStatus}
        />
      </Paper>
      {renderRejectMessages()}
    </Fragment>
  )
}
export default DocumentProcedure
