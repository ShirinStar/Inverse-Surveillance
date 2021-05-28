import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { useForm, Controller } from 'react-hook-form';
import DNS from 'images/DSN.png';
import HelpOutline from '@material-ui/icons/HelpOutline';
import Tooltip from '@material-ui/core/Tooltip';
import Backdrop from '@material-ui/core/Backdrop';
import Close from '@material-ui/icons/Close';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,

  };
}

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SerialNumberModal(props) {
  const {
    open,
    handleClose,
    onSubmit,
  } = props;

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const { control, handleSubmit, register } = useForm();

  return (
    <Modal 
      open={open}
      onClose={handleClose}
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}>
      <Card className={classes.root}>
        <Button className='btn close' onClick={handleClose}><Close ></Close></Button>
        <br/>
        <CardContent>
          <div >
            <div className='DSN-modal-div'>
              <h2 className='sure'> Are you sure there are no more fields for this page?</h2>
              <p className='sureTwo'>If yes, please enter the new page Serial Number: </p>
              <form className='DSN-form' onSubmit={handleSubmit(onSubmit)}>
                <p className='form-labels'>New Page Serial Number </p>
                <Tooltip interactive leaveDelay={600}
                title={
                  <React.Fragment>
                    <img className='hover-image' src={DNS} />
                  </React.Fragment>
                }>
                  <Button color='secondary'><HelpOutline fontSize="small"></HelpOutline></Button>
                </Tooltip>
                <br />
                <TextField required id="standard-basic" inputRef={register} name="pageSerialNumber" label="New Page Serial Number" />
                <p className='secondDate serial'>If the document is missing a serial number, please fill in "MISSING".</p>
                <br /><br />
                <Button className='btn saveDSN' variant="contained" type="submit">Save and Start New Page</Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </Modal>
  );
}
