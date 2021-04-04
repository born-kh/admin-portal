import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { Button } from '@material-ui/core'

type PropsType = {
  open: boolean
  onClose: () => void
  onChange: (e: any) => void
  ranges: {
    startDate: Date
    endDate: Date
    key: string
  }
}

export default function DatePicker(props: PropsType) {
  const { open, onClose, onChange, ranges } = props
  return (
    <Dialog fullWidth={true} maxWidth={'md'} open={open} onClose={onClose} aria-labelledby="max-width-dialog-title">
      <DialogTitle id="max-width-dialog-title">Set Date Range</DialogTitle>
      <DialogContent>
        <DateRangePicker
          onChange={onChange}
          showSelectionPreview={true}
          moveRangeOnFirstSelection={false}
          months={2}
          // locale={lang === 'ru' ? ru : en}
          ranges={[ranges]}
          direction="horizontal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}
