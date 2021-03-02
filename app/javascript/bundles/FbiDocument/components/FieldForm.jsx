import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import LabelAutocomplete from './LabelAutocomplete';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100ch',
    },
  },
}));

export default function FieldForm(props) {
  const {
    pageCount,
    digitalDocument,
    saveField,
    existingFields,
    clearFields,
  } = props;

  const existingLabels = existingFields.map(label => ({ label: label, id: -1 }))
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
  } = useForm();
  const [labelValue, setLabelValue] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function openNewPage() {
    setValue("serialNumber", "");
    setPageNumber(pageNumber + 1);
    clearFields();
  }

  function onSubmit(formData, ev) {
    const { serialNumber } = formData;
    saveField({ ...formData, label: labelValue.label, page_number: pageNumber }, ev);
    setLabelValue("");
    reset();
    setValue("serialNumber", serialNumber);
  }

  return (
    <div className="field-form-container">
      {/* <h2>Field Form</h2> */}
      <p>Document Date: <br/>{digitalDocument.document_date}</p>
      <p>Total page Count: {pageCount - pageNumber + 1}</p>
      <p>Current Page: {pageNumber}</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField name='serial-number' required id="standard-required" label="Required" placeholder="Document Serial Number" inputRef={register} />
        {/* <label htmlFor="serial-number">Document Serial Number</label><br /> */}
        <Controller
          name="fieldLabel"
          control={control}
          render={props => (
            <LabelAutocomplete
              existingLabels={existingLabels}
              value={labelValue}
              setValue={setLabelValue} />
          )} />
        <br /><br />
        <label htmlFor="text-body">TextBody</label><br />
        <input required
          id="text-body"
          name="text_body"
          ref={register} />
        <br />
        <input type="submit" value="Save" />
      </form>
      <br />
      <Button
        variant="outlined"
        color="primary"
        onClick={openNewPage}
      > Add New Page</Button>
    </div>
  );
}
