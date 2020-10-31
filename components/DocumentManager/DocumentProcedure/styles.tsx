import { makeStyles, withStyles, StepConnector, Step, StepConnectorProps } from '@material-ui/core'
import { DocumentStatus, StepType } from '@interfaces/document-manager'
import SettingsIcon from '@material-ui/icons/Settings'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import VideoLabelIcon from '@material-ui/icons/VideoLabel'
import FaceIcon from '@material-ui/icons/Face'
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd'
import EditIcon from '@material-ui/icons/Edit'
import DoneAllIcon from '@material-ui/icons/DoneAll'
import clsx from 'clsx'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { StepIconProps } from '@material-ui/core/StepIcon'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import { activeStepColor, rejectStepColor, newDocStepColor, approveStepColor } from '@utils/constants'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import NewReleasesIcon from '@material-ui/icons/NewReleases'
import WarningIcon from '@material-ui/icons/Warning'
export const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.5,
  },
  active: {
    backgroundColor: activeStepColor,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  reject: {
    backgroundColor: rejectStepColor,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  approved: {
    backgroundColor: approveStepColor,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  new: {
    backgroundColor: newDocStepColor,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  },
  current: {
    opacity: 1,
  },
  completed: {
    backgroundImage: 'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
})
type ColorlibStepIconPropsType = {
  propsIcon: StepIconProps
  step: StepType
  activeStep: number
  count: number
}
export function ColorlibStepIcon(props: ColorlibStepIconPropsType) {
  const classes = useColorlibStepIconStyles()
  const { active, completed, tabIndex } = props.propsIcon
  let icon = props.step.icon
  let completedEdit = false
  if (props.propsIcon && props.propsIcon.icon >= props.count - 1) {
    if (completed) {
      icon = <CheckCircleOutlineIcon />
      completedEdit = true
    }
  } else {
    if (props.step.status === DocumentStatus.rejected) {
      icon = <WarningIcon />
    } else if (props.step.status === DocumentStatus.approved) {
      icon = <CheckCircleOutlineIcon />
    } else if (props.step.status === DocumentStatus.new) {
      icon = <NewReleasesIcon />
    }
  }

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.current]: active,
        [classes.reject]: props.step.status === DocumentStatus.rejected,
        [classes.approved]: props.step.status === DocumentStatus.approved || completedEdit,
      })}
    >
      {icon}
    </div>
  )
}
