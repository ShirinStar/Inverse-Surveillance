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
            <h1>Process a Document</h1>
          </div>
          <div className='welcome'>
            <p>Welcome & Thank you for taking part in this research.<br />
            Please visit the <span className='welcome span'>Help page</span> an the top right corner of the page.</p>
          </div>
        </div>
        <div className='init-form'>
          <div className='date-form'>
         
              <p className='start-title'>To start
             <a className='start-open' target="_blank" href={props.docUrl} onClick={() => setOpenDoc(true)}>Click to Open & Download the Original Document</a>
              </p>
       

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='first-form-fields'>
                {openDoc
                  ?
                  <div className='initFields'>
                    <p className='form-labels'>Document date</p>
                    <Tooltip
                      title={
                        <React.Fragment>
                          <img className='hover-image' src={DocumentDate} />
                        </React.Fragment>
                      }>
                      <HelpOutline fontSize="small"></HelpOutline>
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
                { docDate && (
                <div className='initFields'>
                  <p className='form-labels'>Page Serial Number</p>
                  <Tooltip title={
                    <React.Fragment>
                      <img className='hover-image' src={DNS} />
                    </React.Fragment>
                  }>
                    <HelpOutline fontSize="small"></HelpOutline>
                  </Tooltip>

                  <TextField
                    required
                    id="standard-basic"
                    label="Document serial number"
                    name="startPageSerialNumber"
                    inputRef={register} />
                </div>
                )}
              </div>
              {startPageSerialNumber && (
              <div className='btn start'>
                <p className='btn start text'>Great! Now let's </p>
                <Button type="submit" variant="contained" color="secondary">Start A Document</Button>
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
