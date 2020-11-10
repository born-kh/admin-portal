import { DocumentStatus, ColorlibStepIconProps } from '@interfaces/document-manager'
import clsx from 'clsx'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import { activeStepColor, rejectStepColor, newDocStepColor, approveStepColor } from '@utils/constants'
import NewReleasesIcon from '@material-ui/icons/NewReleases'
import WarningIcon from '@material-ui/icons/Warning'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    stepLabel: {
      '&:hover': {
        cursor: 'pointer',
      },
    },
    header: {
      display: 'flex',
      justifyContent: 'space',
    },
    button: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  })
)

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

export function ColorlibStepIcon(props: ColorlibStepIconProps) {
  const classes = useColorlibStepIconStyles()
  const { active, completed } = props.propsIcon
  let icon = props.step.icon
  let completedEdit = false
  if (props.propsIcon.icon && props.propsIcon.icon >= props.count - 1) {
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
