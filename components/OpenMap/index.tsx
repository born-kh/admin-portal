let Map: any

if (typeof window !== 'undefined') {
  Map = require('react-leaflet')
}
import { Dialog, Button, Typography } from '@material-ui/core'
import { CustomDialogTitle, CustomDialogContent, CustomDialogActions } from '@components/common/Modal'
import useTranslation from 'hooks/useTranslation'
export function OpenMap({ position }: { position: number[] }) {
  return (
    <Map.MapContainer
      attributionControl
      center={position}
      doubleClickZoom
      dragging
      easeLinearity={0.35}
      maxZoom={10}
      scrollWheelZoom
      zoom={6}
      zoomControl
    >
      <Map.TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
      <Map.Marker position={position}>
        <Map.Popup>Popup for any custom information.</Map.Popup>
      </Map.Marker>
    </Map.MapContainer>
  )
}

type PropsType = {
  handleClose: () => void
  open: boolean
  position: number[]
}
export default function OpenMapComponent(props: PropsType) {
  const { t } = useTranslation()
  return (
    <Dialog
      onClose={props.handleClose}
      aria-labelledby="customized-dialog-title"
      maxWidth={'md'}
      fullWidth
      open={props.open}
    >
      <CustomDialogTitle id="customized-dialog-title" onClose={props.handleClose}>
        {t('location')}
      </CustomDialogTitle>
      <CustomDialogContent dividers>
        {props.position.length > 0 ? (
          <OpenMap position={props.position} />
        ) : (
          <Typography variant="h5"> geo location does not exist</Typography>
        )}
      </CustomDialogContent>
      <CustomDialogActions>
        <a
          href={
            props.position.length > 0
              ? `https://www.google.com/maps/@${props.position[0]},${props.position[1]},7z?hl=en`
              : ''
          }
          target="_blank"
        >
          <Button disabled={props.position.length === 0} color="primary">
            OPEN IN G.MAPS
          </Button>
        </a>
        <Button color="primary" onClick={props.handleClose}>
          Ok
        </Button>
      </CustomDialogActions>
    </Dialog>
  )
}
