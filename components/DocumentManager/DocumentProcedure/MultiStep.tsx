import React, { useEffect, useState } from 'react'
//material ui components
import { Stepper, Step, Button, StepLabel, Box } from '@material-ui/core/'
// material ui interfaces
import { ApplicationStatus, DocumentStatus, MultiStepProps } from '@interfaces/document-manager'
//styles
import { ColorlibStepIcon, useStyles } from './styles'

export default function (props: MultiStepProps) {
  const classes = useStyles()
  const {
    activeStep,
    handleNext,
    handleBack,
    handleSetActiveStep,
    handleRejectDocument,
    handleApproveDocument,
    handleApproveApplication,
    handleRejectApplication,
    blocking,
    handleDoneDocumentProcedure,
  } = props

  const [allDocumentsApproved, setAllDocumentsApproved] = useState(false)
  const { steps } = props

  useEffect(() => {
    let count = 0
    let countTypes = steps.length - 2
    for (let i = 0; i < countTypes; i++) {
      console.log(steps[i].status)
      if (steps[i].status === DocumentStatus.approved) {
        count++
      }
    }
    if (count === countTypes) {
      setAllDocumentsApproved(true)
    }
  }, [steps])

  const documentButtonStyle = activeStep < steps.length - 2 ? {} : { display: 'none' }
  const rejectApplicationButtonStyle = activeStep === steps.length - 1 ? {} : { display: 'none' }
  const approveApplicationButtonStyle =
    activeStep === steps.length - 1 && allDocumentsApproved ? {} : { display: 'none' }

  return (
    <div className={classes.root}>
      <Box display="flex" p={1}>
        <Box p={1} flexGrow={1}>
          <div>
            <Button
              disabled={blocking}
              variant="contained"
              color="primary"
              onClick={handleDoneDocumentProcedure}
              className={classes.button}
            >
              Overview
            </Button>
            <Button
              variant="outlined"
              color="primary"
              disabled={activeStep === 0 || blocking}
              onClick={handleBack}
              className={classes.button}
            >
              Previous
            </Button>
            <Button
              disabled={activeStep === steps.length - 1 || blocking}
              variant="outlined"
              color="primary"
              onClick={handleNext}
              className={classes.button}
            >
              Next
            </Button>
          </div>
        </Box>
        <Box p={1}>
          <div>
            <Button
              variant="contained"
              style={documentButtonStyle}
              disabled={blocking || steps[activeStep].status !== DocumentStatus.new}
              color="secondary"
              onClick={() => handleRejectDocument(steps[activeStep].typeID || '')}
              className={classes.button}
            >
              Reject
            </Button>
            <Button
              disabled={blocking || steps[activeStep].status !== DocumentStatus.new}
              variant="contained"
              style={documentButtonStyle}
              color="primary"
              onClick={() => handleApproveDocument(DocumentStatus.approved, steps[activeStep].typeID || '')}
              className={classes.button}
            >
              Approve
            </Button>

            <Button
              disabled={blocking}
              variant="contained"
              style={rejectApplicationButtonStyle}
              color="secondary"
              onClick={() => handleRejectApplication()}
              className={classes.button}
            >
              Reject Application
            </Button>
            <Button
              disabled={blocking}
              variant="contained"
              style={approveApplicationButtonStyle}
              color="primary"
              onClick={() => handleApproveApplication(ApplicationStatus.approved)}
              className={classes.button}
            >
              Approve Application
            </Button>
          </div>
        </Box>
      </Box>

      <Stepper activeStep={activeStep}>
        {steps.map((item, index) => (
          <Step key={item.name}>
            <StepLabel
              onClick={() => handleSetActiveStep(index)}
              className={classes.stepLabel}
              StepIconComponent={(propsIcon) => (
                <ColorlibStepIcon propsIcon={propsIcon} count={steps.length} step={item} activeStep={activeStep} />
              )}
            >
              {item.name}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>{steps[activeStep].component}</div>
    </div>
  )
}
