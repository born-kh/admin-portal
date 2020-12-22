import { useState, useEffect } from 'react'
//material ui components
import { Button, TextField, InputLabel, FormControl, MenuItem, Paper, Grid, Select } from '@material-ui/core'
//document-manager interface EditStepProps
import { EditStepProps } from '@interfaces/document-manager'
//constants
import { genderOptions, typeOptions, nationOptions, DOCUMENT_FILE_URL } from '@utils/constants'
//custom components
import ImageComponent from '@components/common/ImageComponent'

import dynamic from 'next/dynamic'
const Viewer = dynamic(() => import('react-viewer'), { ssr: false })
import useStyles from './style'
import useTranslation from 'hooks/useTranslation'

export default function EditStep(props: EditStepProps) {
  const classes = useStyles()
  const { documents, fields, handleOnChange, blocking, handleSumbit } = props
  const [selectID, setSelectID] = useState('')
  const [docID, setDocID] = useState<string | undefined>(undefined)
  const { t } = useTranslation()
  useEffect(() => {
    if (documents.length > 0) {
      setSelectID(documents[0].ID)
    }
  }, [documents])

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.editStepImages}>
            {documents.map((item, i) => (
              <Grid item xs={2} key={i}>
                <Button
                  variant="outlined"
                  color="primary"
                  style={{ marginBottom: 10 }}
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
              label={t('lastName')}
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
              label={t('firstName')}
              name="fields.passport.first_name"
              className={classes.textField}
              onChange={handleOnChange}
              value={fields.passport?.first_name}
            />

            <TextField
              label={t('dateOfBirth')}
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
              <InputLabel id="fields.passport.nationality">{t('nationality')}</InputLabel>

              <Select
                labelId="fields.passport.nationality"
                id="fields.passport.nationality"
                name="fields.passport.nationality"
                value={fields.passport?.nationality}
                onChange={handleOnChange}
                label={t('nationality')}
              >
                {nationOptions.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label={t('issueDate')}
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
              label={t('expritaionDate')}
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
              label={t('number')}
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
              label={t('personalNumber')}
              name="fields.passport.personal_number"
              className={classes.textField}
              onChange={handleOnChange}
              value={fields.passport?.personal_number}
            />
            <FormControl variant="outlined" className={classes.textField}>
              <InputLabel id="fields.passport.sex">{t('gender')}</InputLabel>

              <Select
                labelId="fields.passport.sex"
                id="fields.passport.sex"
                name="fields.passport.sex"
                value={fields.passport?.sex || ''}
                onChange={handleOnChange}
                label={t('gender')}
              >
                {genderOptions.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl variant="outlined" className={classes.textField}>
              <InputLabel id="fields.passport.type">{t('type')}</InputLabel>

              <Select
                labelId="fields.passport.type"
                id="fields.passport.type"
                name="fields.passport.type"
                value={fields.passport?.type || ''}
                onChange={handleOnChange}
                label={t('type')}
              >
                {typeOptions.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              variant="outlined"
              margin="normal"
              required
              type="text"
              id="fields.passport.issuingAuth"
              label={t('issuingAuth')}
              name="fields.passport.issuingAuth"
              className={classes.textField}
              onChange={handleOnChange}
              value={fields.passport?.issuingAuth}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="fields.passport.address"
              label={t('address')}
              name="fields.passport.address"
              className={classes.textField}
              onChange={handleOnChange}
              value={fields.passport?.address}
            />
            <Grid style={{ width: '100%', justifyContent: 'flex-end', marginRight: 30 }}>
              {' '}
              <Button
                className={classes.editButton}
                disabled={blocking}
                variant="contained"
                color="primary"
                onClick={handleSumbit}
              >
                {t('save')}
              </Button>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.editPaperImage}>
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
