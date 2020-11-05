import { useState, useEffect } from 'react'
import { Button, CardHeader, CardActions } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { DocumentStatus, Document, PassportStepProps } from '@interfaces/document-manager'
import ImageComponent from '@components/common/ImageComponent'
import { DOCUMENT_FILE_URL } from '@utils/constants'
import DeleteIcon from '@material-ui/icons/Delete'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import dynamic from 'next/dynamic'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import useStyles from './style'

const Viewer = dynamic(() => import('react-viewer'), { ssr: false })

export default function (props: PassportStepProps) {
  const classes = useStyles()
  const { document, handleDeleteDocument, handleSetMapPosition } = props
  const [passport, setPassport] = useState<Document | null>(null)
  const [docID, setDocID] = useState<string | undefined>(undefined)

  useEffect(() => {
    const newPassport = document.documents.find((item) => item.status === DocumentStatus.new)
    if (newPassport) {
      setPassport(newPassport)
    } else if (document.documents.length > 0) {
      setPassport(document.documents[0])
    }
  }, [document])

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paperImages}>
            {document.documents.map((item, i) => (
              <Grid item xs={3} key={i}>
                <Button
                  variant="outlined"
                  color="primary"
                  classes={{
                    label: classes.imageButtonLabel,
                  }}
                >
                  <ImageComponent ID={item.ID} alt={'Selfie'} />
                </Button>
              </Grid>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardHeader title={`${passport?.status}`} />
            <CardContent className={classes.card}>
              <ImageComponent ID={passport?.ID} alt={'passport'} onclick={() => setDocID(passport?.ID)} />
            </CardContent>
            <CardActions disableSpacing>
              <IconButton
                disabled={!passport || passport?.status === DocumentStatus.approved}
                aria-label="delete"
                onClick={() => passport && handleDeleteDocument(passport?.ID)}
                color="secondary"
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                color="primary"
                disabled={!passport?.geo}
                aria-label="location"
                onClick={() => passport && handleSetMapPosition([passport.geo.latitude, passport.geo.longitude])}
              >
                <LocationOnIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <Viewer
        zIndex={9999}
        visible={docID !== undefined}
        onClose={() => setDocID(undefined)}
        images={[{ src: DOCUMENT_FILE_URL + docID, alt: '' }]}
      />
    </div>
  )
}
