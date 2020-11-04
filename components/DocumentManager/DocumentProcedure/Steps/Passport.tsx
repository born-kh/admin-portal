import { useState, useEffect } from 'react'
import { Button, CardHeader, CardActions } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { DocumentTypes, DocumentStatus, Document } from '@interfaces/document-manager'
import ImageComponent from '@components/common/ImageComponent'
import { DOCUMENT_FILE_URL } from '@utils/constants'
import DeleteIcon from '@material-ui/icons/Delete'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import dynamic from 'next/dynamic'

import LocationOnIcon from '@material-ui/icons/LocationOn'
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
    card: {
      display: 'flex',
      justifyContent: 'center',
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      height: 320,
    },

    paperImage: {
      display: 'flex',
      justifyContent: 'center',
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      height: 400,
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
  handleDeleteDocument: (ID: string) => void
  handleSetMapPosition: (position: number[]) => void
}
const Passport = (props: PropsType) => {
  const classes = useStyles()
  const { document, handleDeleteDocument, handleSetMapPosition } = props
  const [passport, setPassport] = useState<Document | null>(null)
  useEffect(() => {
    const newPassport = document.documents.find((item) => item.status === DocumentStatus.new)
    if (newPassport) {
      setPassport(newPassport)
    } else if (document.documents.length > 0) {
      setPassport(document.documents[0])
    }
  }, [document])
  const [docID, setDocID] = useState<string | undefined>(undefined)
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

export default Passport
