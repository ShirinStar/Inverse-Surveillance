import React from 'react';
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
  const { register, handleSubmit } = useForm();
  const classes = useStyles();
  const { onSubmit } = props;

  return (
    <>
      <h1>Process a Document</h1>
      <p className='original-link'>
        <a target="_blank" href={props.docUrl}>Open Original Document</a>
      </p>
      <div className='init-form'>
        <div className='date-form'>
          <p className='start-title'>To start please fill:</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='first-form-fields'>
              <div className='seperate-first-fields'>
                <div className='title-question'>
                  <p className='form-labels date'>Document date</p>
                  <Tooltip
                  title={
                    <React.Fragment>
                      <img className='hover-image' src={DocumentDate}/>
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
                  // label="Document date"
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
                      <img className='hover-image' src={DNS}/>
                    </React.Fragment>
                  }>
                    <HelpOutline fontSize="small"></HelpOutline>
                  </Tooltip>
                </div>
                <TextField required id="standard-basic" label="Document serial number" name="startPageSerialNumber"/>
              </div>
            </div>
            <div className='btn start'>
              <Button type="submit" variant="contained" color="primary">Start Document</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
