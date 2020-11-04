import { useState, useEffect } from 'react'
import { Button, TextField, InputLabel, FormControl, MenuItem } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { Document, Fields } from '@interfaces/document-manager'
import MySelect from '@material-ui/core/Select'
import { genderOptions, typeOptions, nationOptions, DOCUMENT_FILE_URL } from '@utils/constants'
import dynamic from 'next/dynamic'
import ImageComponent from '@components/common/ImageComponent'
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
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
      height: 456,
    },
    textField: {
      margin: theme.spacing(1),
      width: '30ch',
    },
    button: {
      marginRight: theme.spacing(1),
      float: 'right',
      width: 150,
    },

    paperImages: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    images: {
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
      padding: theme.spacing(2),
    },
  })
)

type Propstype = {
  documents: Document[]
  fields: Fields
  handleOnChange: (e: React.ChangeEvent<any>) => void
  handleSumbit: () => void

  blocking: boolean
}
const EditDocument = (props: Propstype) => {
  const classes = useStyles()
  const { documents, fields, handleOnChange, blocking, handleSumbit } = props
  const [selectID, setSelectID] = useState('')
  const [docID, setDocID] = useState<string | undefined>(undefined)
  useEffect(() => {
    if (documents.length > 0) {
      setSelectID(documents[0].ID)
    }
  }, [documents])

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.images}>
            {documents.map((item, i) => (
              <Grid item xs={2} key={i}>
                <Button
                  variant="outlined"
                  color="primary"
                  classes={{
                    label: classes.imageButtonLabel,
                  }}
                  onClick={() => setSelectID(item.ID)}
                >
                  <ImageComponent ID={item.ID} alt={'Selfie'} />
                </Button>
              </Grid>
            ))}
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paperImages}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="fields.passport.last_name"
              label="Last Name"
              name="fields.passport.last_name"
              className={classes.textField}
              onChange={handleOnChange}
              value={fields.passport?.last_name}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="fields.passport.first_name"
              label="First Name"
              name="fields.passport.first_name"
              className={classes.textField}
              onChange={handleOnChange}
              value={fields.passport?.first_name}
            />

            <TextField
              label="Date of birth"
              type="date"
              name="fields.passport.date_of_birth"
              id="fields.passport.date_of_birth"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              value={fields.passport?.date_of_birth}
              onChange={handleOnChange}
            />

            <FormControl variant="outlined" className={classes.textField}>
              <InputLabel id="fields.passport.nationality">Nationality</InputLabel>

              <MySelect
                labelId="fields.passport.nationality"
                id="fields.passport.nationality"
                name="fields.passport.nationality"
                value={fields.passport?.nationality}
                onChange={handleOnChange}
                label="Nationality"
              >
                {nationOptions.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </MySelect>
            </FormControl>
            <TextField
              label="Issue date"
              type="date"
              name="fields.passport.issue_date"
              id="fields.passport.issue_date"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleOnChange}
              value={fields.passport?.issue_date}
            />
            <TextField
              label="Expiration date"
              type="date"
              name="fields.passport.expiration_date"
              id="fields.passport.expiration_date"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleOnChange}
              value={fields.passport?.expiration_date}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="fields.passport.number"
              label="Number"
              name="fields.passport.number"
              className={classes.textField}
              onChange={handleOnChange}
              value={fields.passport?.number}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="fields.passport.personal_number"
              label="Personal Number"
              name="fields.passport.personal_number"
              className={classes.textField}
              onChange={handleOnChange}
              value={fields.passport?.personal_number}
            />
            <FormControl variant="outlined" className={classes.textField}>
              <InputLabel id="fields.passport.sex">Gender</InputLabel>

              <MySelect
                labelId="fields.passport.sex"
                id="fields.passport.sex"
                name="fields.passport.sex"
                value={fields.passport?.sex || ''}
                onChange={handleOnChange}
                label="Gender"
              >
                {genderOptions.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </MySelect>
            </FormControl>

            <FormControl variant="outlined" className={classes.textField}>
              <InputLabel id="fields.passport.type">Type</InputLabel>

              <MySelect
                labelId="fields.passport.type"
                id="fields.passport.type"
                name="fields.passport.type"
                value={fields.passport?.type || ''}
                onChange={handleOnChange}
                label="Type"
              >
                {typeOptions.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </MySelect>
            </FormControl>

            <TextField
              label="Issuing Auth"
              type="date"
              name="fields.passport.issuingAuth"
              id="fields.passport.issuingAuth"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleOnChange}
              value={fields.passport?.issuingAuth}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="fields.passport.address"
              label="Address"
              name="fields.passport.address"
              className={classes.textField}
              onChange={handleOnChange}
              value={fields.passport?.address}
            />
            <Grid style={{ width: '100%', justifyContent: 'flex-end', marginRight: 30 }}>
              {' '}
              <Button
                className={classes.button}
                disabled={blocking}
                variant="contained"
                color="primary"
                onClick={handleSumbit}
              >
                Save
              </Button>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paperImage}>
            <ImageComponent ID={selectID} alt={'Passport'} onclick={() => setDocID(selectID)} />
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

export default EditDocument
