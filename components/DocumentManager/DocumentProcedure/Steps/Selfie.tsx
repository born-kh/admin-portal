import { Fragment } from 'react'

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { DocumentTypes, Document } from '@interfaces/document-manager'
import { Button } from '@material-ui/core'
import ImageComponent from '@components/common/ImageComponent'
import { DOCUMENT_FILE_URL } from '@utils/constants'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
    },
    imageButton: {
      width: 100,
      height: 100,
    },

    paperImage: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
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
  passportDocuments: Document[]
}
const Selfie = (props: PropsType) => {
  const classes = useStyles()
  const { document, passportDocuments } = props

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper className={classes.paperImage}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paperImage}>xs=6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paperImages}>
            {document.documents.map((item) => (
              <Grid item xs={3}>
                <Button variant="outlined" color="primary" className={classes.imageButton}>
                  <ImageComponent src={DOCUMENT_FILE_URL + item.ID} alt={'Selfie'} />
                </Button>
              </Grid>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paperImages}>
            {passportDocuments.map((item) => (
              <Grid item xs={3}>
                <Button variant="outlined" color="primary" className={classes.imageButton}>
                  <ImageComponent src={DOCUMENT_FILE_URL + item.ID} alt={'Selfie'} />
                </Button>
              </Grid>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default Selfie
