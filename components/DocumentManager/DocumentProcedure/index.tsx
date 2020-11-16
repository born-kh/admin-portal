import React, { Fragment, useEffect, useState } from 'react'
//material ui components
import {
  Dialog,
  DialogTitle,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  Paper,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@material-ui/core'
//document-manager interfaces
import {
  DocumentTypes,
  Document,
  DocumentStatus,
  Fields,
  SexType,
  StepType,
  ApplicationStatus,
  DocumentProcedureProps,
  SetDocumentStatusParams,
  SetApplicationStatusParams,
} from '@interfaces/document-manager'
//formik lib
import { useFormik } from 'formik'
//helpers
import { convertMRZDate } from '@utils/helpers'

import { CustomDialogTitle, CustomDialogActions, CustomDialogContent } from '@components/common/Modal'
//constants
import { rejectMessages, initialAlertData, DateConvertType } from '@utils/constants'
//material ui icons
import FaceIcon from '@material-ui/icons/Face'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import EditIcon from '@material-ui/icons/Edit'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import Loader from '@components/common/Loader'
import SnackBarAlert, { AlertMessageType } from '@components/common/SnackbarAlert'
//documnet-manager REST APIS
import { documentAPI } from 'service/api'
//OpenMap
import OpenMap from '@components/OpenMap'
//MultiStep Component and Step Components
import MultiStep from './MultiStep'
import SelfieStep from './Steps/SelfieStep'
import PassportStep from './Steps/PassportStep'
import EditStep from './Steps/EditStep'
import ConfirmStep from './Steps/ConfirmStep'
import useTranslation from 'hooks/useTranslation'

export default function (props: DocumentProcedureProps) {
  const [rejectMessage, setRejectMessage] = useState('')
  const [rejectMessageIndex, setRejectMessageIndex] = useState<number | null>(0)
  const [documentTypes, setDocumentTypes] = useState<DocumentTypes[]>([])
  const [passportDocuments, setPassportDocuments] = useState<Document[]>([])
  const [mapPosition, setMapPosition] = useState<number[]>([])
  const [isReject, setIsReject] = useState(false)
  const { t } = useTranslation()
  const [isLoadingTypes, setIsLoadingTypes] = useState(false)
  const [documentTypeID, setDocumentTypeID] = useState<string | null>(null)
  const [deleteID, setDeleteID] = useState<string | null>(null)
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
          date_of_birth: '',
          expiration_date: '',
          issue_date: '',
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

      if (passportFields.length > 0 && passportFields[0].fields && passportFields[0].fields.passport) {
        const passport = passportFields[0].fields.passport
        formik.setValues({
          documentID: passportFields[0].ID,
          fields: {
            passport: {
              ...passport,
              issue_date: convertMRZDate(passport.issue_date, DateConvertType.issue),
              expiration_date: convertMRZDate(passport.expiration_date, DateConvertType.expiry),
              date_of_birth: convertMRZDate(passport.date_of_birth, DateConvertType.dob),
            },
          },
        })
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
                expiration_date: convertMRZDate(passport.expiration_date, DateConvertType.expiry),
                date_of_birth: convertMRZDate(passport.date_of_birth, DateConvertType.dob),
                sex: passport.sex,
                type: passport.type,
                issue_date: convertMRZDate(passport.expiration_date, DateConvertType.issue),
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
                expiration_date: convertMRZDate(idCard.expiration_date, DateConvertType.issue) || '',
                date_of_birth: convertMRZDate(idCard.date_of_birth, DateConvertType.dob) || '',
                sex: idCard.sex,
                type: idCard.type,
                issue_date: convertMRZDate(idCard.expiration_date, DateConvertType.expiry) || '',
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

        documentType.status = status

        return documentType
      })

      setPassportDocuments(
        props.documents.filter(
          (doc) => doc.documenSet.ID === props.documentSetID && doc.documentType.typeName !== 'SELFIE'
        )
      )

      setDocumentTypes(newDocumentTypes)
      setIsLoadingTypes(false)
    }

    async function loadTypes() {
      setIsLoadingTypes(true)
      documentAPI
        .fetchDocumentTypes({ setID: props.documentSetID })
        .then((response) => {
          if (response.status === 200) {
            setTypes(response.data.types)
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

  const _saveDocumentData = () => {
    let fields: Fields = formik.values.fields
    if (fields.passport) {
      fields = {
        passport: {
          ...fields.passport,
          issue_date: new Date(fields.passport?.issue_date).toISOString().split('.')[0] + 'Z',
          date_of_birth: new Date(fields.passport?.date_of_birth).toISOString().split('.')[0] + 'Z',
          expiration_date: new Date(fields.passport?.expiration_date).toISOString().split('.')[0] + 'Z',
        },
      }
    }

    setBlocking(true)
    documentAPI
      .setDocumentFields({ documentID: formik.values.documentID, fields })
      .then((response) => {
        handleClose()
        setAlertData({ message: response.data.message, type: AlertMessageType.sucess, open: true })
      })
      .catch((error) => {
        handleClose()
        setAlertData({ message: `Save Document data ${error.message}`, type: AlertMessageType.error, open: true })
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
        console.log(response)
        props.handleUpdateDocument(typeID, documentSetID, status)
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
    if (status === ApplicationStatus.rejected) {
      params.reason = rejectMessage
    }
    setBlocking(true)
    documentAPI
      .setApplicationStatus(params)
      .then((response) => {
        handleClose()
        setAlertData({ message: response.data.message, type: AlertMessageType.sucess, open: true })
        props.handleNextApplication()
      })
      .catch((error) => {
        handleClose()
        setAlertData({ message: `Application set status ${error.message}`, type: AlertMessageType.error, open: true })
      })
  }

  const handleClose = () => {
    setDocumentTypeID(null)
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

  const renderSteps = () => {
    var stepsDocuments: StepType[] = documentTypes.map((documentType, index) => {
      if (documentType.name === 'SELFIE') {
        return {
          name: documentType.note || '',
          status: documentType.status,
          icon: <FaceIcon />,
          component: (
            <SelfieStep
              key={index}
              document={documentType}
              passportDocuments={passportDocuments}
              handleSetMapPosition={(position: number[]) => setMapPosition(position)}
              handleDeleteDocument={(ID) => setDeleteID(ID)}
            />
          ),
          typeID: documentType.ID,
        }
      } else {
        return {
          name: documentType.note || '',
          status: documentType.status,
          icon: <AssignmentIndIcon />,
          component: (
            <PassportStep
              key={index}
              document={documentType}
              handleDeleteDocument={(ID) => setDeleteID(ID)}
              handleSetMapPosition={(position: number[]) => setMapPosition(position)}
            />
          ),
          typeID: documentType.ID,
        }
      }
    })
    const stepsConfirm = [
      {
        name: t('editDocument'),
        status: DocumentStatus.new,
        icon: <EditIcon />,
        component: (
          <EditStep
            documents={passportDocuments}
            fields={formik.values.fields}
            key={'editDocument'}
            blocking={blocking}
            handleOnChange={formik.handleChange}
            handleSumbit={_saveDocumentData}
          />
        ),
      },
      {
        name: t('confirmDocument'),
        status: DocumentStatus.new,

        icon: <DoneAllIcon />,
        component: <ConfirmStep key={'confirmDocument'} documents={props.documents} fields={formik.values.fields} />,
      },
    ]
    return stepsDocuments.concat(stepsConfirm)
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
      <OpenMap open={mapPosition.length !== 0} handleClose={() => setMapPosition([])} position={mapPosition} />

      <Dialog
        open={deleteID !== null}
        onClose={() => setDeleteID(null)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Are you sure you want to remove this document?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description"></DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              deleteID && props.handleDeleteDocument(deleteID)
              setDeleteID(null)
            }}
            color="primary"
            autoFocus
          >
            {t('aggree')}
          </Button>
          <Button onClick={() => setDeleteID(null)} color="primary">
            {t('disagree')}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}
