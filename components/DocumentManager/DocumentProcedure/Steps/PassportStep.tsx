import { useState, useEffect } from 'react'
//material ui components
import { Button, CardHeader, CardActions, Paper, Grid, Card, CardContent, IconButton } from '@material-ui/core'
//document-manager interfaces
import { DocumentStatus, Document, PassportStepProps } from '@interfaces/document-manager'
//Custom ImageComponent
import ImageComponent from '@components/common/ImageComponent'
//constants
import { DOCUMENT_FILE_URL } from '@utils/constants'
//material ui icons
import DeleteIcon from '@material-ui/icons/Delete'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import dynamic from 'next/dynamic'
const Viewer = dynamic(() => import('react-viewer'), { ssr: false })

import useStyles from './style'

export default function PassportStep(props: PassportStepProps) {
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
                  style={{ marginBottom: 10 }}
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
