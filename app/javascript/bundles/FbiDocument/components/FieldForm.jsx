import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import LabelAutocomplete from './LabelAutocomplete';
import SerialNumberModal from './SerialNumberModal';
import { Controller } from 'react-hook-form';

import RedactionEditor from './RedactionEditor';


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
    pageSerialNumber,
    setPageSerialNumber,
    labelValue,
    setLabelValue,
    handleSubmit,
    register,
    reset,
    control,
    setValue,
    pageNumber,
    setPageNumber,
    setModalSerialOpen,
    modalSerialOpen,
  } = props;

  const existingLabels = existingFields.map(label => ({ label: label, id: -1 }))

  const [ textBody, setTextBody ] = useState('');

  function openNewPage(pageSerialNumber) {
    setValue("serialNumber", "");
    setPageNumber(pageNumber + 1);
    setPageSerialNumber(pageSerialNumber)
    clearFields();
  }

  function onSubmit(formData, ev) {
    const { serialNumber } = formData;
    saveField({
      ...formData,
      label: labelValue.label,
      page_number: pageNumber,
      pageSerialNumber: pageSerialNumber,
      text_body: textBody,
    }, ev);
    setLabelValue("");
    reset();
    setValue("serialNumber", serialNumber);
  }

  const showFields = () => {
    return (
      <>
        <RedactionEditor onChange={setTextBody} />
        <Button
          variant="contained"
          type="submit"
          value="Save">
          Save Field
        </Button>
      </>
    );
  }

  return (
    <>
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
          { labelValue && labelValue.label.length > 0 && showFields() }
        </form>
        <br />
        <br />
        <br />
        {/* change maybe to if page complete click here to start a new page */}
        <SerialNumberModal
          open={modalSerialOpen}
          handleClose={() => setModalSerialOpen(false)}
          onSubmit={({ pageSerialNumber }) => {
            setPageSerialNumber(pageSerialNumber)
            openNewPage(pageSerialNumber)
            setModalSerialOpen(false)
          }} />
      </div>
    </>
  );
}
