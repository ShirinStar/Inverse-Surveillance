import React from 'react';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
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
}));

export default function DigitalDocumentForm(props) {
  const { register, handleSubmit } = useForm();
  const classes = useStyles();
  const { onSubmit } = props;

  return (
    <div className='init-form'>
      <div className='date-form'>
        <h2>Document date </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            required
            inputRef={register}
            id="date"
            name="document_date"
            label="Document date"
            type="date"
            defaultValue=""
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <br /><br />
          <Button type="submit" variant="contained" color="primary">Start Document</Button>
        </form>
      </div>
    </div>
  );
}
