import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import LabelAutocomplete from './LabelAutocomplete';
import SerialNumberModal from './SerialNumberModal';

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
  const [ modalSerialOpen, setModalSerialOpen ] = useState(false);
  const [serialPageNumber, setSerialPageNumber] = useState(digitalDocument.startPageSerialNumber)

console.log(serialPageNumber)

  function openNewPage() {
    setValue("serialNumber", "");
    setPageNumber(pageNumber + 1);
    setSerialPageNumber()
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
    <>
      <div className='document-head-section'>
        <h2>Document Form</h2>
        <p >
          <a target="_blank" href={props.docUrl}>Link of the Original Document</a>
        </p>
        <p>Document Date: {digitalDocument.document_date}</p>
        <p>Current page: {pageNumber} / {pageCount - pageNumber + 1}</p>
      </div>

      <div className="field-form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <Button variant="contained" type="submit" value="Save">Save Field</Button>
        </form>
        <br />
        <br />
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={() => setModalSerialOpen(true)}
        > + Add New Page</Button>
         <SerialNumberModal
          open={modalSerialOpen} 
          onSubmit={({pageSerialNumber}) => {
            setSerialPageNumber(pageSerialNumber)
            setModalSerialOpen(false)
          }}/>
      </div>
    </>
  );
}
