import { useState, useEffect } from 'react'
//material ui components
import { Paper, Grid, Card, CardContent, IconButton, Button, CardHeader, CardActions } from '@material-ui/core'
//custom image component
import ImageComponent from '@components/common/ImageComponent'
//constants
import { DOCUMENT_FILE_URL } from '@utils/constants'
//material ui icons
import DeleteIcon from '@material-ui/icons/Delete'
import LocationOnIcon from '@material-ui/icons/LocationOn'

import dynamic from 'next/dynamic'
const Viewer = dynamic(() => import('react-viewer'), { ssr: false })

import useStyles from './style'
import { ISelfieStepProps, IDocument, DocumentStatus } from '@Interfaces'

export default function SelfieStep(props: ISelfieStepProps) {
  const classes = useStyles()
  const { document, passportDocuments, handleDeleteDocument, handleSetMapPosition } = props
  const [selfie, setSelfie] = useState<IDocument | null>(null)
  const [passport, setPassport] = useState<IDocument | null>(null)
  const [docID, setDocID] = useState<string | undefined>(undefined)

  useEffect(() => {
    const newSelfie = document.documents.find((item) => item.status === DocumentStatus.new)
    if (newSelfie) {
      setSelfie(newSelfie)
    } else if (document.documents.length > 0) {
      setSelfie(document.documents[0])
    } else {
      setSelfie(null)
    }

    const newPassport = passportDocuments.find((item) => item.status === DocumentStatus.new)
    if (newPassport) {
      setPassport(newPassport)
    } else if (passportDocuments.length > 0) {
      setPassport(passportDocuments[0])
    } else {
      setSelfie(null)
    }
  }, [document.documents, passportDocuments])

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Card>
            <CardHeader title={`${selfie?.status || 'No Document'}`} />
            <CardContent className={classes.card}>
              <ImageComponent ID={selfie?.ID} alt={'Selfie'} onclick={() => setDocID(selfie?.ID)} />
            </CardContent>
            <CardActions disableSpacing>
              <IconButton
                aria-label="delete"
                disabled={!selfie || selfie?.status === DocumentStatus.approved}
                color="secondary"
                onClick={() => selfie && handleDeleteDocument(selfie?.ID)}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton
                color="primary"
                disabled={!selfie?.geo}
                aria-label="location"
                onClick={() => selfie && handleSetMapPosition([selfie.geo.latitude, selfie.geo.longitude])}
              >
                <LocationOnIcon />
              </IconButton>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardHeader title={`${passport?.status || 'No Document'}`} />
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
        <Grid item xs={6}>
          <Paper className={classes.paperImages}>
            {document.documents.map((item, i) => (
              <Grid item xs={3} key={i}>
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ marginBottom: 10 }}
                  onClick={() => setSelfie(item)}
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
          <Paper className={classes.paperImages}>
            {passportDocuments.map((item, i) => (
              <Grid item xs={3} key={i}>
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ marginBottom: 10 }}
                  onClick={() => setPassport(item)}
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
