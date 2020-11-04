import { useState, useEffect } from 'react'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { Document, Fields } from '@interfaces/document-manager'
import ImageComponent from '@components/common/ImageComponent'
import { DOCUMENT_FILE_URL } from '@utils/constants'
import { primaryText } from '@utils/constants'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Title from '@components/common/Title'
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
    table: {
      minWidth: 300,
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
}
const ConfirmDocument = (props: Propstype) => {
  const classes = useStyles()
  const { documents, fields } = props
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
        <Grid item xs={6}>
          <TableContainer component={Paper} style={{ padding: 10 }}>
            <Table className={classes.table} aria-label="simple table">
              <Title> Document Info </Title>
              <TableBody>
                <TableRow key={fields.passport?.first_name}>
                  <TableCell align="left" width={150}>
                    First Name:
                  </TableCell>
                  <TableCell align="left" style={{ color: primaryText }}>
                    {fields.passport?.first_name}
                  </TableCell>
                  <TableCell align="left" width={150}>
                    Last Name:
                  </TableCell>
                  <TableCell align="left" style={{ color: primaryText }}>
                    {fields.passport?.last_name}
                  </TableCell>
                </TableRow>
                <TableRow key={fields.passport?.date_of_birth}>
                  <TableCell align="left" width={150}>
                    Date of birth:
                  </TableCell>
                  <TableCell align="left" style={{ color: primaryText }}>
                    {fields.passport?.date_of_birth}
                  </TableCell>
                  <TableCell align="left" width={150}>
                    Nationality:
                  </TableCell>
                  <TableCell align="left" style={{ color: primaryText }}>
                    {fields.passport?.nationality}
                  </TableCell>
                </TableRow>

                <TableRow key={fields.passport?.issuingAuth}>
                  <TableCell align="left" width={150}>
                    Issue Date:
                  </TableCell>
                  <TableCell align="left" style={{ color: primaryText }}>
                    {fields.passport?.issue_date}
                  </TableCell>
                  <TableCell align="left" width={150}>
                    Expiration Date:
                  </TableCell>
                  <TableCell align="left" style={{ color: primaryText }}>
                    {fields.passport?.expiration_date}
                  </TableCell>
                </TableRow>

                <TableRow key={fields.passport?.number}>
                  <TableCell align="left" width={150}>
                    Number:
                  </TableCell>
                  <TableCell align="left" style={{ color: primaryText }}>
                    {fields.passport?.number}
                  </TableCell>
                  <TableCell align="left" width={150}>
                    Personal number:
                  </TableCell>
                  <TableCell align="left" style={{ color: primaryText }}>
                    {' '}
                    {fields.passport?.personal_number}
                  </TableCell>
                </TableRow>
                <TableRow key={fields.passport?.sex}>
                  <TableCell align="left" width={150}>
                    Gender:
                  </TableCell>
                  <TableCell align="left" style={{ color: primaryText }}>
                    {fields.passport?.sex}
                  </TableCell>
                  <TableCell align="left" width={150}>
                    Type:
                  </TableCell>
                  <TableCell align="left" style={{ color: primaryText }}>
                    {fields.passport?.type}
                  </TableCell>
                </TableRow>
                <TableRow key={fields.passport?.address}>
                  <TableCell align="left" width={150}>
                    Address:
                  </TableCell>
                  <TableCell align="left" style={{ color: primaryText }}>
                    {fields.passport?.address}
                  </TableCell>
                  <TableCell align="left" width={150}>
                    Issuing Auth:
                  </TableCell>
                  <TableCell align="left" style={{ color: primaryText }}>
                    {fields.passport?.issuingAuth}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={6}>
          <TableContainer component={Paper} style={{ padding: 10 }}>
            <Table className={classes.table} aria-label="simple table">
              <Title>Documents</Title>
              <TableBody>
                {documents.map((item) => {
                  return (
                    <TableRow key={fields.passport?.address}>
                      <TableCell align="left">
                        <TableRow key={item.status}>
                          <TableCell align="left" width={150}>
                            Status:
                          </TableCell>
                          <TableCell align="left" style={{ color: primaryText }}>
                            {item.status}
                          </TableCell>
                        </TableRow>
                        <TableRow key={item.documentType.typeName}>
                          <TableCell align="left" width={150}>
                            Document Type:
                          </TableCell>
                          <TableCell align="left" style={{ color: primaryText }}>
                            {item.documentType.typeName}
                          </TableCell>
                        </TableRow>
                      </TableCell>
                      <TableCell align="left" style={{ color: primaryText, height: 100 }}>
                        <ImageComponent ID={item.ID} alt={'Document'} onclick={() => setDocID(item.ID)} />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
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

export default ConfirmDocument
