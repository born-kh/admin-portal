import { Fragment, useState, useEffect } from 'react'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { DocumentTypes, Document, DocumentStatus } from '@interfaces/document-manager'
import { Button, CardHeader, CardActions } from '@material-ui/core'
import ImageComponent from '@components/common/ImageComponent'
import { DOCUMENT_FILE_URL } from '@utils/constants'
import DeleteIcon from '@material-ui/icons/Delete'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import dynamic from 'next/dynamic'
const Viewer = dynamic(() => import('react-viewer'), { ssr: false })
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
    },
    imageButtonLabel: {
      height: 80,
      width: 100,
    },

    paperImage: {
      display: 'flex',

      justifyContent: 'center',
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      height: 400,
    },
    card: {
      display: 'flex',
      justifyContent: 'center',
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      height: 320,
    },
    button: {
      margin: theme.spacing(1),
    },
    media: {
      maxHeight: '100%',
      maxWidth: '100%',
    },
    paperImages: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',

      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
  })
)
type PropsType = {
  document: DocumentTypes
  passportDocuments: Document[]
  handleDeleteDocument: (ID: string) => void
  handleSetMapPosition: (position: number[]) => void
}
const Selfie = (props: PropsType) => {
  const classes = useStyles()
  const { document, passportDocuments, handleDeleteDocument, handleSetMapPosition } = props
  const [selfie, setSelfie] = useState<Document | null>(null)
  const [passport, setPassport] = useState<Document | null>(null)
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
              <ImageComponent
                src={DOCUMENT_FILE_URL + selfie?.ID}
                alt={'Selfie'}
                onclick={() => setDocID(selfie?.ID)}
              />
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
              <ImageComponent
                src={DOCUMENT_FILE_URL + passport?.ID}
                alt={'passport'}
                onclick={() => setDocID(passport?.ID)}
              />
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
                  onClick={() => setSelfie(item)}
                  classes={{
                    label: classes.imageButtonLabel,
                  }}
                >
                  <ImageComponent src={DOCUMENT_FILE_URL + item.ID} alt={'Selfie'} />
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
                  onClick={() => setPassport(item)}
                  classes={{
                    label: classes.imageButtonLabel,
                  }}
                >
                  <ImageComponent src={DOCUMENT_FILE_URL + item.ID} alt={'Selfie'} />
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

export default Selfie
