import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { useForm, Controller } from 'react-hook-form';

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
  paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
  },
}));

export default function RedactionModal(props) {
  const { 
    open,
    handleClose,
    onSubmit,
  } = props;

  const classes = useStyles();
  const [ modalStyle ] = useState(getModalStyle);

  const { control, handleSubmit, register } = useForm();

  return (
    <Modal style={modalStyle} className={classes.paper}
      open={open}
      onClose={handleClose}>
      <Card className={classes.root}>
      <Button onClick={handleClose}>X</Button>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField inputRef={register} name="redactionCode" />
            <Button variant="contained" type="submit">Save Code</Button>
          </form>
        </CardContent>
        <CardActions>
        </CardActions>
      </Card>
    </Modal>
  );
}
