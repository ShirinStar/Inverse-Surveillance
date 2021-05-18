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

export default function SubmitModal(props) {
  const {
    open,
    handleClose,
    docId,
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
      }}
      style={{display:'flex',alignItems:'center',justifyContent:'center'}}
      >
      <Card className={classes.root}>
        <Button className='btn close' onClick={handleClose}><Close></Close></Button>
        <br/>
        <CardContent>
          <div >
            <div className='DSN-modal-div'>
              <h2 className='sure'> Are you sure you would like to submit the document?</h2>
                <form action="/turk_documents/complete" method="POST">
                  <input type="hidden" name="authenticity_token" value={document.querySelector('[name=csrf-token]').content} />
                  <input type="hidden" name="doc_id" value={docId} />
                  <Button className='btn saveDSN' variant="contained" type="submit">Yes, I'm all done</Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </Modal>
  );
}
