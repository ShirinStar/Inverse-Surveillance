import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { useForm, Controller } from 'react-hook-form';
import Backdrop from '@material-ui/core/Backdrop';
import Close from '@material-ui/icons/Close';
import HelpOutline from '@material-ui/icons/HelpOutline';
import Tooltip from '@material-ui/core/Tooltip';
import markedRedCode from 'images/markedRedCode.png';


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

export default function RedactionModal(props) {
  const { 
    open,
    handleClose,
    onSubmit,
    redactionSize,
    range,
  } = props;

  const classes = useStyles();
  const [ modalStyle ] = useState(getModalStyle);
  const [ redactionCode, setRedactionCode ] = useState('');
  const [hasCode, setHasCode] = useState(false)

  const handleChange = (ev) => {
    const { value } = ev.target;
    setRedactionCode(value);
    setHasCode(true)
  }

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
      }}
      style={{display:'flex',alignItems:'center',justifyContent:'center'}}
      >
      <Card className={classes.root}>
        <Button className='btn close' onClick={handleClose}><Close ></Close></Button>
        <CardContent>
          <TextField 
            required
            onChange={handleChange}
            value={redactionCode}
            name="redactionCode" 
            autoFocus
            label="Redaction code"/>
             <Tooltip interactive leaveDelay={600}
              title={
                  <React.Fragment>
                    <img className='hover-image instruction' src={markedRedCode} />
                  </React.Fragment>
                }>
                 <Button color='secondary'><HelpOutline fontSize="small"></HelpOutline></Button>
                </Tooltip>
                <p className='misscode'>If you can not match a code please write "MISS"</p>
            <br/>
            <br/>
            { hasCode ?
          <Button className='btn saveDSN'
            onClick={() => {
              onSubmit({ redactionCode, redactionSize, range })
              setRedactionCode('');
              setHasCode(false)
            }}
            variant="contained"
            type="submit">Save Code</Button>
          : '' }
        </CardContent>
      </Card>
    </Modal>
  );
}
