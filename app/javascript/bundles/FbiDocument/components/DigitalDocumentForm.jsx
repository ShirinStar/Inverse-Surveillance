import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import HelpOutline from '@material-ui/icons/HelpOutline';
import Tooltip from '@material-ui/core/Tooltip';
import DNS from 'images/DSN.png';
import DocumentDate from 'images/DocumentDate.png';


const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  customWidth: {
    maxWidth: 500,
  },
  noMaxWidth: {
    maxWidth: 'none',
  },
}));

export default function DigitalDocumentForm(props) {
  const { register, handleSubmit, watch } = useForm();
  const classes = useStyles();
  const { onSubmit } = props;
  const [openDoc, setOpenDoc] = useState(false)

  const docDate = watch("document_date");
  const startPageSerialNumber = watch("startPageSerialNumber");
  return (
    <div className='startDoc'>
      <div className='leftSection'>
        <div className='header initDocument'>
          <div className='inner-header'>
            <h1 className='processtitle'>Process a Document</h1>
          </div>
          <div className='welcome'>
            <p>Welcome & thank you for taking part in this research.<br />
            Please visit the <span className='welcome span'>Help page</span> at the top right corner of the page.</p>
          </div>
        </div>
        <div className='init-form'>
          <div className='date-form'>

            <p className='form-labels first'><span className='number'>1.</span>
              <a className='start-open' target="_blank" href={props.docUrl} onClick={() => setOpenDoc(true)}>Click to open & download the original document</a>
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='first-form-fields'>
                {openDoc
                  ?
                  <div className='initFields'>
                    <p className='form-labels'><span className='number'>2.</span> Fill document date</p>
                    <Tooltip interactive leaveDelay={600}
                      title={
                        <React.Fragment>
                          <img className='hover-image' src={DocumentDate} />
                        </React.Fragment>
                      }>
                      <Button color='secondary'><HelpOutline fontSize="small"></HelpOutline></Button>
                    </Tooltip>

                    <TextField
                      required
                      inputRef={register}
                      id="date"
                      name="document_date"
                      type="date"
                      defaultValue=""
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>
                  :
                  ''
                }
                {docDate && (
                  <div className='initFields'>
                    <p className='form-labels three'><span className='number'>3.</span> Fill page Serial Number</p>
                    <Tooltip interactive leaveDelay={600}
                      title={
                        <React.Fragment>
                          <img className='hover-image' src={DNS} />
                        </React.Fragment>
                      }>
                      <Button color='secondary'><HelpOutline fontSize="small"></HelpOutline></Button>
                    </Tooltip>
                    <div className='labelAlign'>
                      <TextField
                        required
                        id="standard-basic"
                        label="Document serial number"
                        name="startPageSerialNumber"
                        inputRef={register} />
                    </div>
                  </div>
                )}
              </div>
              {startPageSerialNumber && (
                <div className='btn start'>
                  <p className='btn start text'><span className='number'>4. </span>Great! Now let's </p>
                  <Button type="submit" variant="outlined" color="secondary">Start a Document</Button>
                </div>
              )}

            </form>
          </div>
        </div>
      </div>

      <div className='PDFprev'>
        <embed src={props.docUrl} width="450px" height="550px" />
      </div>
    </div>
  );
}
