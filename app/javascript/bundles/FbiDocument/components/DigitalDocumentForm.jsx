import React from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import HelpOutline from '@material-ui/icons/HelpOutline';
import Tooltip from '@material-ui/core/Tooltip';
import DNS from 'images/DSN.png';
import DocumentDate from 'images/DocumentDate.png';
import { saveAs } from 'file-saver'

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
  const { register, handleSubmit } = useForm();
  const classes = useStyles();
  const { onSubmit } = props;

  return (
    <div>
      <div className='header initDocument'>
        <div className='inner-header'>
          <h1>Start Process a Document</h1>
        </div>
      </div>
      <div className='init-form'>
        <div className='date-form'>
          <div className='start-url-div'>
            <p className='start-title'>To start please
            <a target="_blank" href={props.docUrl} download>view Original Document</a>
            <br /> and fill:</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='first-form-fields'>
              <div className='seperate-first-fields'>
                <div className='title-question'>
                  <p className='form-labels date'>Document date</p>
                  <Tooltip
                    title={
                      <React.Fragment>
                        <img className='hover-image' src={DocumentDate} />
                      </React.Fragment>
                    }>
                    <HelpOutline fontSize="small"></HelpOutline>
                  </Tooltip>
                </div>
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
              <div className='seperate-first-fields'>
                <div className='title-question'>
                  <p className='form-labels'>Page Serial Number</p>
                  <Tooltip title={
                    <React.Fragment>
                      <img className='hover-image' src={DNS} />
                    </React.Fragment>
                  }>
                    <HelpOutline fontSize="small"></HelpOutline>
                  </Tooltip>
                </div>
                <TextField
                  required
                  id="standard-basic"
                  label="Document serial number"
                  name="startPageSerialNumber"
                  inputRef={register} />
              </div>
            </div>
            <div className='btn start'>
              <Button type="submit" variant="contained" color="primary">Start Document</Button>
            </div>
          </form>
        </div>
      </div>
      <div className='welcome'>
        <p>Welcome & Thank you for taking part in this research!<br/>
        for any questions please visit the<a href='/help' className='a welcome'> Help page</a> or<a href="mailto: isp@gmail.com" className='a welcome'> contact us.</a></p>
      </div>
    </div>
  );
}
